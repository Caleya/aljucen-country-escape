import { useState } from "react";
import { z } from "zod";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Mail, CheckCircle2 } from "lucide-react";
import selloAsset from "@/assets/sello.png.asset.json";

export const CONTACT_EMAIL = "casarurallaplata@gmail.com";

const MAX = 60;
const req = (msg: string) => z.string().trim().min(1, msg).max(MAX, `Máximo ${MAX} caracteres`);
const opt = z.string().trim().max(MAX, `Máximo ${MAX} caracteres`).optional().or(z.literal(""));
const num = (msg: string) =>
  z
    .string()
    .trim()
    .min(1, msg)
    .max(3)
    .refine((value) => /^\d+$/.test(value) && Number(value) > 0, "Introduce un número mayor que 0");
const numOpt = z
  .string()
  .trim()
  .max(3)
  .refine((value) => value === "" || (/^\d+$/.test(value) && Number(value) > 0), "Introduce un número mayor que 0")
  .optional()
  .or(z.literal(""));

const schema = z.object({
  // Datos de la reserva
  referencia: opt,
  fechaContrato: opt,
  entrada: z.string().min(1, "Indica la fecha de entrada"),
  salida: z.string().min(1, "Indica la fecha de salida"),
  personas: num("Indica el nº de personas"),
  habitaciones: numOpt,
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
  tEmail: z.string().trim().email("Email no válido").max(80, "Máximo 80 caracteres"),
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
  vEmail: z.string().trim().max(80, "Máximo 80 caracteres").optional().or(z.literal("")),
  vParentesco: opt,
  vDireccion: opt,
  vDireccion2: opt,
  vPais: opt,
  vProvincia: opt,
  vMunicipio: opt,
  vCodigoPostal: opt,
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

/* ---------- COMPONENTES Y HELPERS (FUERA DEL COMPONENTE PRINCIPAL) ---------- */

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <fieldset className="rounded-xl border border-border p-4 sm:p-5">
    <legend className="px-2 font-serif text-lg font-semibold text-foreground">{title}</legend>
    <div className="grid gap-4 sm:grid-cols-3">{children}</div>
  </fieldset>
);

/* ---------- PDF ---------- */

type Cell = { label: string; value: string; span?: number };

async function loadSello(): Promise<string | null> {
  try {
    const res = await fetch(selloAsset.url);
    if (!res.ok) return null;
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    return await new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error("No se pudo preparar el sello"));
          return;
        }
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("No se pudo cargar el sello"));
      };
      image.src = objectUrl;
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
  const BOTTOM = 812;
  let y = 40;

  const heading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20);
    doc.text(text, left, y);
    y += 14;
  };

  const table = (rows: Cell[][]) => {
    rows.forEach((row) => {
      const cols = row.reduce((sum, c) => sum + (c.span ?? 1), 0);
      const unit = width / cols;
      const prepared = row.map((cell) => {
        const cellWidth = unit * (cell.span ?? 1);
        const rawLines = doc.splitTextToSize(cell.value || "", cellWidth - 8) as string[];
        const lines = rawLines.flatMap((line) => {
          if (doc.getTextWidth(line) <= cellWidth - 8) return [line];
          const pieces: string[] = [];
          let current = "";
          for (const character of line) {
            if (doc.getTextWidth(current + character) > cellWidth - 8 && current) {
              pieces.push(current);
              current = character;
            } else {
              current += character;
            }
          }
          if (current) pieces.push(current);
          return pieces;
        });
        return { ...cell, cellWidth, lines };
      });
      const valueHeight = Math.max(14, ...prepared.map((cell) => Math.min(2, Math.max(1, cell.lines.length)) * 9 + 5));
      const rowHeight = 12 + valueHeight;
      if (y + rowHeight > BOTTOM) return;
      let x = left;
      doc.setDrawColor(30);
      doc.setLineWidth(0.5);
      prepared.forEach((cell) => {
        const w = cell.cellWidth;
        doc.rect(x, y, w, rowHeight);
        doc.line(x, y + 12, x + w, y + 12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(20);
        doc.text(cell.label, x + 4, y + 8.5);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(cell.lines.length ? cell.lines.slice(0, 2) : [""], x + 4, y + 21, { lineHeightFactor: 1.1 });
        x += w;
      });
      y += rowHeight + 3;
    });
    y += 5;
  };

  const sello = await loadSello();
  if (sello) {
    try {
      doc.addImage(sello, "JPEG", right - 68, 26, 62, 82);
      y = 116;
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

  // Garantiza una sola página
  while (doc.getNumberOfPages() > 1) doc.deletePage(doc.getNumberOfPages());

  return doc;
}

function buildMailto(v: FormValues) {
  const subject = `Parte de entrada - ${v.tNombre} ${v.tApellido1} (${formatDate(v.entrada)} a ${formatDate(v.salida)})`;
  const body = [
    "Hola, aquí tienes que adjuntar el formulario descargado.",
    "",
    `Titular: ${v.tNombre} ${v.tApellido1} ${v.tApellido2 ?? ""}`.trim(),
    `Teléfono: ${v.tTelefono}`,
    `Entrada: ${formatDate(v.entrada)}`,
    `Salida: ${formatDate(v.salida)}`,
    `Personas: ${v.personas}`,
    "",
    "ADJUNTAR EL PDF DESCARGADO CON TODOS LOS DATOS.",
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ---------- COMPONENTE PRINCIPAL ---------- */

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
    window.setTimeout(() => {
      document.getElementById("enviar-solicitud")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const renderField = (
    name: FieldName,
    label: string,
    options?: {
      type?: string;
      className?: string;
      placeholder?: string;
      disabled?: boolean;
      maxLength?: number;
    },
  ) => (
    <div key={name} className={options?.className}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={options?.type ?? "text"}
        value={values[name] ?? ""}
        onChange={(e) => {
          const limit = options?.maxLength ?? 60;
          let next = e.target.value;
          if (options?.type === "number") next = next.replace(/[^\d]/g, "");
          update(name, next.slice(0, limit));
        }}
        placeholder={options?.placeholder}
        disabled={options?.disabled}
        maxLength={options?.maxLength ?? 60}
        min={options?.type === "number" ? 1 : undefined}
        step={options?.type === "number" ? 1 : undefined}
        className="mt-1"
      />
      {errors[name] && <p className="mt-1 text-sm text-destructive">{errors[name]}</p>}
    </div>
  );

  const renderSelect = (name: FieldName, label: string, opts: string[], disabled?: boolean) => (
    <div key={name}>
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

  const docTypes = ["DNI", "NIE", "Pasaporte", "Permiso de conducir", "Otro"];
  const sexes = ["Mujer", "Hombre", "Otro"];
  const payTypes = ["Efectivo", "Tarjeta", "Transferencia", "Plataforma de pago", "Otro"];

  return (
    <form id="formulario-reserva" onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Section title="Datos de la reserva">
        {renderField("referencia", "Referencia")}
        {renderField("fechaContrato", "Fecha del contrato", { type: "date" })}
        {renderField("entrada", "Fecha de entrada", { type: "date" })}
        {renderField("salida", "Fecha de salida", { type: "date" })}
        {renderField("personas", "Número de personas", { type: "number", maxLength: 3 })}
        {renderField("habitaciones", "Número de habitaciones", { type: "number", maxLength: 3 })}
      </Section>

      <Section title="Información del pago">
        {renderSelect("tipoPago", "Tipo de pago", payTypes)}
        {renderField("medioPago", "Medios de pago")}
        {renderField("titularPago", "Titular del pago")}
        {renderField("fechaPago", "Fecha de pago", { type: "date" })}
      </Section>

      <Section title="Datos del titular">
        {renderField("tNombre", "Nombre")}
        {renderField("tApellido1", "Primer apellido")}
        {renderField("tApellido2", "Segundo apellido")}
        {renderField("tNacimiento", "Fecha de nacimiento", { type: "date" })}
        {renderField("tNacionalidad", "Nacionalidad")}
        {renderSelect("tSexo", "Sexo", sexes)}
        {renderSelect("tTipoDoc", "Tipo de documento", docTypes)}
        {renderField("tDocumento", "Documento")}
        {renderField("tSoporteDoc", "Soporte del documento")}
        {renderField("tTelefono", "Teléfono", { type: "tel" })}
        {renderField("tTelefono2", "Teléfono adicional", { type: "tel" })}
        {renderField("tEmail", "Correo electrónico", { type: "email", maxLength: 80 })}
      </Section>

      <Section title="Dirección del titular">
        {renderField("tDireccion", "Dirección")}
        {renderField("tDireccion2", "Dirección adicional")}
        {renderField("tPais", "País")}
        {renderField("tProvincia", "Provincia")}
        {renderField("tMunicipio", "Municipio")}
        {renderField("tCodigoPostal", "Código postal")}
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
        {renderField("vNombre", "Nombre", { disabled: sameAsTitular })}
        {renderField("vApellido1", "Primer apellido", { disabled: sameAsTitular })}
        {renderField("vApellido2", "Segundo apellido", { disabled: sameAsTitular })}
        {renderField("vNacimiento", "Fecha de nacimiento", { type: "date", disabled: sameAsTitular })}
        {renderField("vNacionalidad", "Nacionalidad", { disabled: sameAsTitular })}
        {renderSelect("vSexo", "Sexo", sexes, sameAsTitular)}
        {renderSelect("vTipoDoc", "Tipo de documento", docTypes, sameAsTitular)}
        {renderField("vDocumento", "Documento", { disabled: sameAsTitular })}
        {renderField("vSoporteDoc", "Soporte del documento", { disabled: sameAsTitular })}
        {renderField("vTelefono", "Teléfono", { type: "tel", disabled: sameAsTitular })}
        {renderField("vTelefono2", "Teléfono adicional", { type: "tel", disabled: sameAsTitular })}
        {renderField("vEmail", "Correo electrónico", { type: "email", disabled: sameAsTitular, maxLength: 80 })}
        {renderField("vParentesco", "Parentesco", { disabled: sameAsTitular })}
      </Section>

      <Section title="Dirección del viajero">
        {renderField("vDireccion", "Dirección", { disabled: sameAsTitular })}
        {renderField("vDireccion2", "Dirección adicional", { disabled: sameAsTitular })}
        {renderField("vPais", "País", { disabled: sameAsTitular })}
        {renderField("vProvincia", "Provincia", { disabled: sameAsTitular })}
        {renderField("vMunicipio", "Municipio", { disabled: sameAsTitular })}
        {renderField("vCodigoPostal", "Código postal", { disabled: sameAsTitular })}
      </Section>

      <Button type="submit" size="lg" className="w-full">
        <Download className="mr-2 h-5 w-5" /> Descargar PDF del parte de entrada
      </Button>

      {mailHref && (
        <div id="enviar-solicitud" className="space-y-3 rounded-xl bg-accent/10 p-4" tabIndex={-1}>
          <p className="flex items-start gap-2 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
            PDF descargado. Ahora abre tu correo, ADJUNTA el PDF y envíanoslo.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => window.location.assign(mailHref)}
          >
            <Mail className="mr-2 h-5 w-5" /> Abrir correo con la solicitud
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Si no se abre tu aplicación, mándalo manualmente a{" "}
            <a className="font-medium text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      )}

      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
        Al enviar se descarga un PDF idéntico al parte de entrada de viajeros, con el sello de la casa.
        Envíalo a {CONTACT_EMAIL} o tráelo a tu llegada.
      </p>
    </form>
  );
}