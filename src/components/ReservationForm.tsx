import { useState } from "react";
import { z } from "zod";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mail, CheckCircle2 } from "lucide-react";
import selloAsset from "@/assets/sello.png.asset.json";

export const CONTACT_EMAIL = "casarurallaplata@gmail.com";

const req = (msg: string) => z.string().trim().min(1, msg).max(120);
const opt = z.string().trim().max(120).optional().or(z.literal(""));

const schema = z.object({
  // Datos de la reserva
  referencia: opt,
  fechaContrato: opt,
  entrada: z.string().min(1, "Indica la fecha de entrada"),
  salida: z.string().min(1, "Indica la fecha de salida"),
  personas: req("Indica el nº de personas"),
  habitaciones: opt,
  // Pago
  tipoPago: opt,
  medioPago: opt,
  titularPago: opt,
  fechaPago: opt,
  // Titular
  tNombre: req("Indica el nombre"),
  tApellido1: req("Indica el primer apellido"),
  tApellido2: opt,
  tNacimiento: opt,
  tNacionalidad: opt,
  tSexo: opt,
  tTipoDoc: opt,
  tDocumento: req("Indica el documento"),
  tSoporteDoc: opt,
  tTelefono: req("Indica un teléfono"),
  tTelefono2: opt,
  tEmail: z.string().trim().email("Email no válido").max(255),
  tDireccion: opt,
  tDireccion2: opt,
  tPais: opt,
  tProvincia: opt,
  tMunicipio: opt,
  tCodigoPostal: opt,
  // Viajero
  vNombre: opt,
  vApellido1: opt,
  vApellido2: opt,
  vNacimiento: opt,
  vNacionalidad: opt,
  vSexo: opt,
  vTipoDoc: opt,
  vDocumento: opt,
  vSoporteDoc: opt,
  vTelefono: opt,
  vTelefono2: opt,
  vEmail: opt,
  vParentesco: opt,
  vDireccion: opt,
  vDireccion2: opt,
  vPais: opt,
  vProvincia: opt,
  vMunicipio: opt,
  vCodigoPostal: opt,
  observaciones: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;
type FieldName = keyof FormValues;

const initialValues = Object.fromEntries(
  Object.keys(schema.shape).map((key) => [key, ""]),
) as FormValues;

function formatDate(value?: string) {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  return d && m && y ? `${d}/${m}/${y}` : value;
}

/* ---------- PDF ---------- */

type Cell = { label: string; value: string; span?: number };

async function loadSello(): Promise<string | null> {
  try {
    const res = await fetch(selloAsset.url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function buildPdf(v: FormValues) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const left = 42;
  const right = 553;
  const width = right - left;
  let y = 52;

  const pageBreak = (needed: number) => {
    if (y + needed > 800) {
      doc.addPage();
      y = 52;
    }
  };

  const heading = (text: string) => {
    pageBreak(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(20);
    doc.text(text, left, y);
    y += 8;
  };

  const table = (rows: Cell[][]) => {
    rows.forEach((row) => {
      pageBreak(46);
      const cols = row.reduce((sum, c) => sum + (c.span ?? 1), 0);
      const unit = width / cols;
      let x = left;
      doc.setDrawColor(30);
      doc.setLineWidth(0.7);
      row.forEach((cell) => {
        const w = unit * (cell.span ?? 1);
        doc.rect(x, y, w, 18);
        doc.rect(x, y + 18, w, 20);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(20);
        doc.text(cell.label, x + 4, y + 12.5);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        const value = doc.splitTextToSize(cell.value || "", w - 8)[0] ?? "";
        doc.text(value, x + 4, y + 31.5);
        x += w;
      });
      y += 38 + 4;
    });
    y += 8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Parte de entrada de viajeros", left, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(110);
  doc.text("Casa Rural La Plata · 9 Calle San Andrés, 06894 Aljucén (Badajoz) · 691 231 248", left, y + 14);
  doc.setTextColor(20);
  y += 34;

  const sello = await loadSello();
  if (sello) {
    try {
      doc.addImage(sello, "PNG", right - 78, 30, 78, 96);
      y = Math.max(y, 138);
    } catch {
      /* sello opcional */
    }
  }

  table([
    [
      { label: "Referencia", value: v.referencia ?? "" },
      { label: "Fecha del contrato", value: formatDate(v.fechaContrato) },
      { label: "Fecha entrada y salida", value: `${formatDate(v.entrada)} - ${formatDate(v.salida)}` },
    ],
    [
      { label: "Número de personas", value: v.personas },
      { label: "Número de habitaciones", value: v.habitaciones ?? "" },
      { label: "", value: "" },
    ],
  ]);

  heading("Información del pago");
  table([
    [
      { label: "Tipo de pago", value: v.tipoPago ?? "" },
      { label: "Medios de pago", value: v.medioPago ?? "" },
      { label: "Titular del pago", value: v.titularPago ?? "" },
    ],
    [
      { label: "Fecha de pago", value: formatDate(v.fechaPago) },
      { label: "", value: "", span: 2 },
    ],
  ]);

  heading("Datos del titular");
  table([
    [
      { label: "Nombre", value: v.tNombre },
      { label: "Primer apellido", value: v.tApellido1 },
      { label: "Segundo apellido", value: v.tApellido2 ?? "" },
    ],
    [
      { label: "Fecha de nacimiento", value: formatDate(v.tNacimiento) },
      { label: "Nacionalidad", value: v.tNacionalidad ?? "" },
      { label: "Sexo", value: v.tSexo ?? "" },
    ],
    [
      { label: "Tipo de documento", value: v.tTipoDoc ?? "" },
      { label: "Documento", value: v.tDocumento },
      { label: "Soporte del documento", value: v.tSoporteDoc ?? "" },
    ],
    [
      { label: "Teléfono", value: v.tTelefono },
      { label: "Teléfono adicional", value: v.tTelefono2 ?? "" },
      { label: "Correo electrónico", value: v.tEmail },
    ],
  ]);

  heading("Dirección del titular");
  table([
    [
      { label: "Dirección", value: v.tDireccion ?? "" },
      { label: "Dirección adicional", value: v.tDireccion2 ?? "" },
      { label: "País", value: v.tPais ?? "" },
    ],
    [
      { label: "Provincia", value: v.tProvincia ?? "" },
      { label: "Municipio", value: v.tMunicipio ?? "" },
      { label: "Código postal", value: v.tCodigoPostal ?? "" },
    ],
  ]);

  heading("Datos del viajero");
  table([
    [
      { label: "Nombre", value: v.vNombre ?? "" },
      { label: "Primer apellido", value: v.vApellido1 ?? "" },
      { label: "Segundo apellido", value: v.vApellido2 ?? "" },
    ],
    [
      { label: "Fecha de nacimiento", value: formatDate(v.vNacimiento) },
      { label: "Nacionalidad", value: v.vNacionalidad ?? "" },
      { label: "Sexo", value: v.vSexo ?? "" },
    ],
    [
      { label: "Tipo de documento", value: v.vTipoDoc ?? "" },
      { label: "Documento", value: v.vDocumento ?? "" },
      { label: "Soporte del documento", value: v.vSoporteDoc ?? "" },
    ],
    [
      { label: "Teléfono", value: v.vTelefono ?? "" },
      { label: "Teléfono adicional", value: v.vTelefono2 ?? "" },
      { label: "Correo electrónico", value: v.vEmail ?? "" },
      { label: "Parentesco", value: v.vParentesco ?? "" },
    ],
  ]);

  heading("Dirección del viajero");
  table([
    [
      { label: "Dirección", value: v.vDireccion ?? "" },
      { label: "Dirección adicional", value: v.vDireccion2 ?? "" },
      { label: "País", value: v.vPais ?? "" },
    ],
    [
      { label: "Provincia", value: v.vProvincia ?? "" },
      { label: "Municipio", value: v.vMunicipio ?? "" },
      { label: "Código postal", value: v.vCodigoPostal ?? "" },
    ],
  ]);

  if (v.observaciones?.trim()) {
    heading("Observaciones");
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const notes = doc.splitTextToSize(v.observaciones.trim(), width) as string[];
    pageBreak(notes.length * 13 + 20);
    doc.text(notes, left, y);
    y += notes.length * 13;
  }

  pageBreak(90);
  y += 24;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Firma del titular:", left, y);
  doc.text("Fecha:", left + 300, y);
  doc.setDrawColor(30);
  doc.line(left + 80, y + 2, left + 260, y + 2);
  doc.line(left + 340, y + 2, right, y + 2);
  y += 34;
  doc.setFontSize(8);
  doc.setTextColor(120);
  const legal = doc.splitTextToSize(
    "Los datos recogidos en este parte de entrada de viajeros se tratan conforme a la normativa vigente de registro documental de viajeros y solo se comunican a las autoridades competentes.",
    width,
  ) as string[];
  doc.text(legal, left, y);

  return doc;
}

function buildMailto(v: FormValues) {
  const subject = `Parte de entrada - ${v.tNombre} ${v.tApellido1} (${formatDate(v.entrada)} a ${formatDate(v.salida)})`;
  const body = [
    "Hola, envío mi solicitud de reserva y el parte de entrada de viajeros.",
    "",
    `Titular: ${v.tNombre} ${v.tApellido1} ${v.tApellido2 ?? ""}`.trim(),
    `Documento: ${v.tTipoDoc ?? ""} ${v.tDocumento}`.trim(),
    `Teléfono: ${v.tTelefono}`,
    `Email: ${v.tEmail}`,
    `Entrada: ${formatDate(v.entrada)}`,
    `Salida: ${formatDate(v.salida)}`,
    `Personas: ${v.personas}`,
    `Habitaciones: ${v.habitaciones ?? ""}`,
    "",
    "Observaciones:",
    v.observaciones?.trim() || "-",
    "",
    "(Adjunto el PDF descargado con todos los datos)",
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ---------- Componente ---------- */

const TITULAR_TO_VIAJERO: Array<[FieldName, FieldName]> = [
  ["tNombre", "vNombre"],
  ["tApellido1", "vApellido1"],
  ["tApellido2", "vApellido2"],
  ["tNacimiento", "vNacimiento"],
  ["tNacionalidad", "vNacionalidad"],
  ["tSexo", "vSexo"],
  ["tTipoDoc", "vTipoDoc"],
  ["tDocumento", "vDocumento"],
  ["tSoporteDoc", "vSoporteDoc"],
  ["tTelefono", "vTelefono"],
  ["tTelefono2", "vTelefono2"],
  ["tEmail", "vEmail"],
  ["tDireccion", "vDireccion"],
  ["tDireccion2", "vDireccion2"],
  ["tPais", "vPais"],
  ["tProvincia", "vProvincia"],
  ["tMunicipio", "vMunicipio"],
  ["tCodigoPostal", "vCodigoPostal"],
];

export function ReservationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sameAsTitular, setSameAsTitular] = useState(true);
  const [mailHref, setMailHref] = useState<string | null>(null);

  const syncViajero = (source: FormValues) => {
    const next = { ...source };
    TITULAR_TO_VIAJERO.forEach(([from, to]) => {
      next[to] = source[from] ?? "";
    });
    next.vParentesco = "Titular";
    return next;
  };

  const update = (field: FieldName, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      return sameAsTitular ? syncViajero(next) : next;
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleSame = (checked: boolean) => {
    setSameAsTitular(checked);
    if (checked) setValues((prev) => syncViajero(prev));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      document.getElementById("formulario-reserva")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (result.data.salida <= result.data.entrada) {
      setErrors({ salida: "La salida debe ser posterior a la entrada" });
      return;
    }

    const doc = await buildPdf(result.data);
    const filename = `parte-entrada-${result.data.tApellido1.toLowerCase().replace(/\s+/g, "-")}.pdf`;
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);

    setMailHref(buildMailto(result.data));
  };

  const field = (
    name: FieldName,
    label: string,
    options?: { type?: string; className?: string; placeholder?: string; disabled?: boolean },
  ) => (
    <div className={options?.className}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={options?.type ?? "text"}
        value={values[name] ?? ""}
        onChange={(e) => update(name, e.target.value)}
        placeholder={options?.placeholder}
        disabled={options?.disabled}
        maxLength={120}
        className="mt-1"
      />
      {errors[name] && <p className="mt-1 text-sm text-destructive">{errors[name]}</p>}
    </div>
  );

  const select = (name: FieldName, label: string, opts: string[], disabled?: boolean) => (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        value={values[name] ?? ""}
        onChange={(e) => update(name, e.target.value)}
        disabled={disabled}
        className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-60 md:text-sm"
      >
        <option value="">Selecciona</option>
        {opts.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {errors[name] && <p className="mt-1 text-sm text-destructive">{errors[name]}</p>}
    </div>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <fieldset className="rounded-xl border border-border p-4 sm:p-5">
      <legend className="px-2 font-serif text-lg font-semibold text-foreground">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-3">{children}</div>
    </fieldset>
  );

  const docTypes = ["DNI", "NIE", "Pasaporte", "Permiso de conducir", "Otro"];
  const sexes = ["Mujer", "Hombre", "Otro"];
  const payTypes = ["Efectivo", "Tarjeta", "Transferencia", "Plataforma de pago", "Otro"];

  return (
    <form id="formulario-reserva" onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Section title="Datos de la reserva">
        {field("referencia", "Referencia")}
        {field("fechaContrato", "Fecha del contrato", { type: "date" })}
        <div className="grid grid-cols-2 gap-4">
          {field("entrada", "Fecha de entrada", { type: "date" })}
          {field("salida", "Fecha de salida", { type: "date" })}
        </div>
        {field("personas", "Número de personas", { type: "number" })}
        {field("habitaciones", "Número de habitaciones", { type: "number" })}
      </Section>

      <Section title="Información del pago">
        {select("tipoPago", "Tipo de pago", payTypes)}
        {field("medioPago", "Medios de pago")}
        {field("titularPago", "Titular del pago")}
        {field("fechaPago", "Fecha de pago", { type: "date" })}
      </Section>

      <Section title="Datos del titular">
        {field("tNombre", "Nombre")}
        {field("tApellido1", "Primer apellido")}
        {field("tApellido2", "Segundo apellido")}
        {field("tNacimiento", "Fecha de nacimiento", { type: "date" })}
        {field("tNacionalidad", "Nacionalidad")}
        {select("tSexo", "Sexo", sexes)}
        {select("tTipoDoc", "Tipo de documento", docTypes)}
        {field("tDocumento", "Documento")}
        {field("tSoporteDoc", "Soporte del documento")}
        {field("tTelefono", "Teléfono", { type: "tel" })}
        {field("tTelefono2", "Teléfono adicional", { type: "tel" })}
        {field("tEmail", "Correo electrónico", { type: "email" })}
      </Section>

      <Section title="Dirección del titular">
        {field("tDireccion", "Dirección")}
        {field("tDireccion2", "Dirección adicional")}
        {field("tPais", "País")}
        {field("tProvincia", "Provincia")}
        {field("tMunicipio", "Municipio")}
        {field("tCodigoPostal", "Código postal")}
      </Section>

      <label className="flex items-center gap-3 rounded-xl bg-muted p-4 text-sm font-medium">
        <input
          type="checkbox"
          checked={sameAsTitular}
          onChange={(e) => toggleSame(e.target.checked)}
          className="h-4 w-4 accent-primary"
        />
        Los datos del viajero son los mismos que los del titular
      </label>

      <Section title="Datos del viajero">
        {field("vNombre", "Nombre", { disabled: sameAsTitular })}
        {field("vApellido1", "Primer apellido", { disabled: sameAsTitular })}
        {field("vApellido2", "Segundo apellido", { disabled: sameAsTitular })}
        {field("vNacimiento", "Fecha de nacimiento", { type: "date", disabled: sameAsTitular })}
        {field("vNacionalidad", "Nacionalidad", { disabled: sameAsTitular })}
        {select("vSexo", "Sexo", sexes, sameAsTitular)}
        {select("vTipoDoc", "Tipo de documento", docTypes, sameAsTitular)}
        {field("vDocumento", "Documento", { disabled: sameAsTitular })}
        {field("vSoporteDoc", "Soporte del documento", { disabled: sameAsTitular })}
        {field("vTelefono", "Teléfono", { type: "tel", disabled: sameAsTitular })}
        {field("vTelefono2", "Teléfono adicional", { type: "tel", disabled: sameAsTitular })}
        {field("vEmail", "Correo electrónico", { type: "email", disabled: sameAsTitular })}
        {field("vParentesco", "Parentesco", { disabled: sameAsTitular })}
      </Section>

      <Section title="Dirección del viajero">
        {field("vDireccion", "Dirección", { disabled: sameAsTitular })}
        {field("vDireccion2", "Dirección adicional", { disabled: sameAsTitular })}
        {field("vPais", "País", { disabled: sameAsTitular })}
        {field("vProvincia", "Provincia", { disabled: sameAsTitular })}
        {field("vMunicipio", "Municipio", { disabled: sameAsTitular })}
        {field("vCodigoPostal", "Código postal", { disabled: sameAsTitular })}
      </Section>

      <div>
        <Label htmlFor="observaciones">Observaciones</Label>
        <Textarea
          id="observaciones"
          rows={4}
          className="mt-1"
          value={values.observaciones ?? ""}
          onChange={(e) => update("observaciones", e.target.value)}
          placeholder="Hora de llegada aproximada, mascotas, necesidades especiales..."
          maxLength={1000}
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        <Download className="mr-2 h-5 w-5" /> Descargar PDF del parte de entrada
      </Button>

      {mailHref && (
        <div className="space-y-3 rounded-xl bg-accent/10 p-4">
          <p className="flex items-start gap-2 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
            PDF descargado. Ahora abre tu correo, adjunta el PDF y envíanoslo.
          </p>
          <Button asChild variant="secondary" size="lg" className="w-full">
            <a href={mailHref}>
              <Mail className="mr-2 h-5 w-5" /> Abrir correo con la solicitud
            </a>
          </Button>
        </div>
      )}

      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
        Al enviar se descarga un PDF idéntico al parte de entrada de viajeros, con el sello de la casa.
        Envíalo a {CONTACT_EMAIL} o tráelo firmado a tu llegada.
      </p>
    </form>
  );
}
