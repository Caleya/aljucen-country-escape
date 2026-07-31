import { useState } from "react";
import { z } from "zod";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mail, CheckCircle2 } from "lucide-react";

export const CONTACT_EMAIL = "casarurallaplata@gmail.com";

const schema = z.object({
  nombre: z.string().trim().min(2, "Indica tu nombre completo").max(100),
  telefono: z
    .string()
    .trim()
    .min(6, "Indica un teléfono de contacto")
    .max(25)
    .regex(/^[0-9+()\s-]+$/, "El teléfono solo puede contener números"),
  email: z.string().trim().email("Email no válido").max(255),
  entrada: z.string().min(1, "Indica la fecha de entrada"),
  salida: z.string().min(1, "Indica la fecha de salida"),
  personas: z.string().min(1, "Indica el número de personas"),
  habitacion: z.string().max(80).optional().or(z.literal("")),
  mensaje: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const initialValues: FormValues = {
  nombre: "",
  telefono: "",
  email: "",
  entrada: "",
  salida: "",
  personas: "2",
  habitacion: "",
  mensaje: "",
};

const roomOptions = [
  "Habitación Doble Grande",
  "Habitación Doble con balcón",
  "Habitación Doble con vistas",
  "Casa completa / sin preferencia",
];

function formatDate(value: string) {
  if (!value) return "-";
  const [y, m, d] = value.split("-");
  return d && m && y ? `${d}/${m}/${y}` : value;
}

function buildPdf(values: FormValues) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const left = 56;
  let y = 70;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Casa Rural La Plata", left, y);
  y += 22;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(110);
  doc.text("9 Calle San Andrés, 06894 Aljucén (Badajoz)", left, y);
  y += 30;
  doc.setDrawColor(200);
  doc.line(left, y, 540, y);
  y += 34;

  doc.setTextColor(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Solicitud de reserva", left, y);
  y += 26;

  const rows: Array<[string, string]> = [
    ["Nombre", values.nombre],
    ["Teléfono", values.telefono],
    ["Email", values.email],
    ["Fecha de entrada", formatDate(values.entrada)],
    ["Fecha de salida", formatDate(values.salida)],
    ["Nº de personas", values.personas],
    ["Habitación de interés", values.habitacion || "Sin preferencia"],
  ];

  doc.setFontSize(11);
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, left, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(value), left + 150, y);
    y += 20;
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Observaciones:", left, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  const notes = doc.splitTextToSize(values.mensaje?.trim() || "-", 484) as string[];
  doc.text(notes, left, y);
  y += notes.length * 16 + 30;

  doc.setTextColor(130);
  doc.setFontSize(9);
  doc.text(`Generado el ${new Date().toLocaleDateString("es-ES")}`, left, y);

  return doc;
}

function buildMailto(values: FormValues) {
  const subject = `Solicitud de reserva - ${values.nombre} (${formatDate(values.entrada)} a ${formatDate(values.salida)})`;
  const body = [
    "Hola, me gustaría solicitar una reserva:",
    "",
    `Nombre: ${values.nombre}`,
    `Teléfono: ${values.telefono}`,
    `Email: ${values.email}`,
    `Entrada: ${formatDate(values.entrada)}`,
    `Salida: ${formatDate(values.salida)}`,
    `Personas: ${values.personas}`,
    `Habitación de interés: ${values.habitacion || "Sin preferencia"}`,
    "",
    "Observaciones:",
    values.mensaje?.trim() || "-",
    "",
    "(Adjunto el PDF descargado con estos mismos datos)",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ReservationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    if (result.data.salida <= result.data.entrada) {
      setErrors({ salida: "La salida debe ser posterior a la entrada" });
      return;
    }

    const doc = buildPdf(result.data);
    doc.save(`solicitud-reserva-${result.data.nombre.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    window.location.href = buildMailto(result.data);
    setSent(true);
  };

  const fieldError = (field: keyof FormValues) =>
    errors[field] ? <p className="mt-1 text-sm text-destructive">{errors[field]}</p> : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="nombre">Nombre y apellidos</Label>
          <Input
            id="nombre"
            value={values.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder="Nombre completo"
            maxLength={100}
          />
          {fieldError("nombre")}
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={values.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            placeholder="600 000 000"
            maxLength={25}
          />
          {fieldError("telefono")}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            maxLength={255}
          />
          {fieldError("email")}
        </div>
        <div>
          <Label htmlFor="entrada">Fecha de entrada</Label>
          <Input
            id="entrada"
            type="date"
            value={values.entrada}
            onChange={(e) => update("entrada", e.target.value)}
          />
          {fieldError("entrada")}
        </div>
        <div>
          <Label htmlFor="salida">Fecha de salida</Label>
          <Input
            id="salida"
            type="date"
            value={values.salida}
            onChange={(e) => update("salida", e.target.value)}
          />
          {fieldError("salida")}
        </div>
        <div>
          <Label htmlFor="personas">Nº de personas</Label>
          <Input
            id="personas"
            type="number"
            min={1}
            max={20}
            value={values.personas}
            onChange={(e) => update("personas", e.target.value)}
          />
          {fieldError("personas")}
        </div>
        <div>
          <Label htmlFor="habitacion">Habitación de interés</Label>
          <select
            id="habitacion"
            value={values.habitacion}
            onChange={(e) => update("habitacion", e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
          >
            <option value="">Sin preferencia</option>
            {roomOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="mensaje">Observaciones</Label>
          <Textarea
            id="mensaje"
            rows={4}
            value={values.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            placeholder="Hora de llegada aproximada, mascotas, necesidades especiales..."
            maxLength={1000}
          />
          {fieldError("mensaje")}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">
        <Download className="mr-2 h-5 w-5" /> Descargar PDF y enviar por email
      </Button>

      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
        Al enviar se descarga un PDF con tu solicitud y se abre tu correo con el mensaje ya redactado para{" "}
        {CONTACT_EMAIL}. Solo tienes que adjuntar el PDF y darle a enviar.
      </p>

      {sent && (
        <p className="flex items-start gap-2 rounded-xl bg-accent/10 p-4 text-sm text-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
          Listo: hemos descargado tu PDF y abierto tu correo. Si no se abre, escríbenos a {CONTACT_EMAIL} o
          llámanos.
        </p>
      )}
    </form>
  );
}