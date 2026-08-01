import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Wind,
  Trees,
  Sofa,
  Sun,
  ChefHat,
  Coffee,
  BedDouble,
  Bath,
  Tv,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight,
  Menu,
  X,
  Users,
  Home,
  Mountain,
  CalendarCheck,
  Droplets,
  Shirt,
  Expand,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

import heroCasa from "@/assets/367534298.jpg";
import entornoExtremadura from "@/assets/entorno-extremadura.jpg";
import actMerida from "@/assets/act-merida.jpg";
import actDolmenes from "@/assets/act-dolmenes.jpg";
import actCornalvo from "@/assets/act-cornalvo.jpg";
import actSenderismo from "@/assets/act-senderismo.jpg";
import actCaceres from "@/assets/act-caceres.jpg";
import actAeropuerto from "@/assets/act-aeropuerto.jpg";
import detalleRustico from "@/assets/detalle-rustico.jpg";
import dolmenDeLacara from "@/assets/Dolmen_de_Lácara_.jpg";
import dolmenDeLacaraNoche from "@/assets/dolmenDeLacaraNoche.jpg";
import presaRomanaParqueDeCornalvo from "@/assets/Torre_de_la_presa_romana_de_Cornalvo,_Extremadura.jpg";
import img357572260 from "@/assets/357572260.jpg";
import img357572268 from "@/assets/357572268.jpg";
import img357572272 from "@/assets/357572272.jpg";
import img357572274 from "@/assets/357572274.jpg";
import img357572277 from "@/assets/357572277.jpg";
import img357572281 from "@/assets/357572281.jpg";
import img357572284 from "@/assets/357572284.jpg";
import img357572288 from "@/assets/357572288.jpg";
import img357572291 from "@/assets/357572291.jpg";
import img357572294 from "@/assets/357572294.jpg";
import img357572301 from "@/assets/357572301.jpg";
import img357572305 from "@/assets/357572305.jpg";
import img357572310 from "@/assets/357572310.jpg";
import img357572312 from "@/assets/357572312.jpg";
import img357572317 from "@/assets/357572317.jpg";
import img357572319 from "@/assets/357572319.jpg";
import img367520139 from "@/assets/367520139.jpg";
import img367520354 from "@/assets/367520354.jpg";
import img367520365 from "@/assets/367520365.jpg";
import img367520394 from "@/assets/367520394.jpg";
import img367528614 from "@/assets/367528614.jpg";
import img367528667 from "@/assets/367528667.jpg";
import img367528681 from "@/assets/367528681.jpg";
import img367528688 from "@/assets/367528688.jpg";
import img367530038 from "@/assets/367530038.jpg";
import img367530060 from "@/assets/367530060.jpg";
import img367530078 from "@/assets/367530078.jpg";
import img367530082 from "@/assets/367530082.jpg";
import img367534281 from "@/assets/367534281.jpg";
import img367534576 from "@/assets/367534576.jpg";
import img367534587 from "@/assets/367534587.jpg";
import img367534599 from "@/assets/367534599.jpg";
import img367534714 from "@/assets/367534714.jpg";
import imgFoto1 from "@/assets/foto1.jpg";
import imgIglesiaAljucen from "@/assets/iglesiaAljucen.jpg";
import imgSalonInterior from "@/assets/salon-interior.jpg";
import imgTerrazaJardin from "@/assets/terraza-jardin.jpg";
import { RoomGalleryDialog } from "@/components/RoomGalleryDialog";
import { ReservationForm, CONTACT_EMAIL } from "@/components/ReservationForm";
import foto01 from "@/assets/foto-01.asset.json";
import foto02 from "@/assets/foto-02.asset.json";
import foto03 from "@/assets/foto-03.asset.json";
import foto04 from "@/assets/foto-04.asset.json";
import foto05 from "@/assets/foto-05.asset.json";
import foto06 from "@/assets/foto-06.asset.json";
import foto07 from "@/assets/foto-07.asset.json";
import foto08 from "@/assets/foto-08.asset.json";
import foto09 from "@/assets/foto-09.asset.json";
import foto10 from "@/assets/foto-10.asset.json";
import foto11 from "@/assets/foto-11.asset.json";
import foto12 from "@/assets/foto-12.asset.json";
import foto13 from "@/assets/foto-13.asset.json";
import foto14 from "@/assets/foto-14.asset.json";
import foto15 from "@/assets/foto-15.asset.json";
import foto16 from "@/assets/foto-16.asset.json";
import foto17 from "@/assets/foto-17.asset.json";
import foto18 from "@/assets/foto-18.asset.json";
import foto19 from "@/assets/foto-19.asset.json";
import foto20 from "@/assets/foto-20.asset.json";
import foto21 from "@/assets/foto-21.asset.json";
import foto22 from "@/assets/foto-22.asset.json";
import foto23 from "@/assets/foto-23.asset.json";
import foto24 from "@/assets/foto-24.asset.json";
import foto25 from "@/assets/foto-25.asset.json";
import foto26 from "@/assets/foto-26.asset.json";

const BOOKING_URL =
  "https://www.booking.com/hotel/es/casa-apartamento-la-plata.es.html?aid=356980&label=gog235jc-10CAMoRkIHYWxqdWNlbkgKWANoRogBAZgBM7gBF8gBFdgBA-gBAfgBAYgCAagCAbgCxJeZ0wbAAgHSAiQ3MjY4NDQ5OC00ZDA2LTQ1YWYtYjMxYy1hNjk4ZTllZWVhOGbYAgHgAgE#availability";

const PHONE_DISPLAY = "691 23 12 48";
const PHONE_HREF = "tel:+34691231248";

const DISCOVER_ITEMS = [
  {
    title: "Mérida, a 15 km",
    text: "Teatro y Anfiteatro Romano, Acueducto de los Milagros y la Basílica de Santa Eulalia: el mayor conjunto monumental romano de España.",
    image: actMerida,
    alt: "Teatro Romano de Mérida al atardecer",
  },
  {
    title: "Dólmenes de Lácara",
    text: "Monumento megalítico de la prehistoria, uno de los sepulcros de corredor más grandes de la península ibérica.",
    image: actDolmenes,
    alt: "Dolmen de Lácara entre encinas",
  },
  {
    title: "Parque Natural de Cornalvo",
    text: "Espacio natural protegido a pocos minutos, con la histórica presa romana de Cornalvo y dehesa para perderse.",
    image: actCornalvo,
    alt: "Embalse y dehesa del Parque Natural de Cornalvo",
  },
  {
    title: "Rutas de senderismo",
    text: "Etapas del Camino de Santiago Vía de la Plata y senderos por la ribera del Aljucén, la dehesa y Cornalvo, aptos para todos los niveles.",
    image: actSenderismo,
    alt: "Sendero señalizado entre encinas en la dehesa extremeña",
  },
  {
    title: "Cáceres y su cuartel",
    text: "A poco más de una hora, la ciudad monumental Patrimonio de la Humanidad y el acuartelamiento de Cáceres, ideal para visitas y jornadas de familiares.",
    image: actCaceres,
    alt: "Plaza Mayor y murallas de Cáceres",
  },
  {
    title: "Aeropuerto de Badajoz, 59 km",
    text: "Bien comunicados por la A-66 y la N-630 para viajeros que llegan de fuera de Extremadura.",
    image: actAeropuerto,
    alt: "Carretera extremeña hacia el aeropuerto de Badajoz",
  },
];

const WHATSAPP_HREF = "https://wa.me/34691231248";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Casa Rural La Plata | Aljucén, Mérida y Cornalvo" },
      {
        name: "description",
        content:
          "Casa rural en Aljucén (Badajoz), a 15 km de Mérida, en el Camino de Santiago Vía de la Plata y junto al Parque Natural de Cornalvo. WiFi y parking gratis.",
      },
      {
        property: "og:title",
        content: "Casa Rural La Plata | Aljucén, Mérida y Cornalvo",
      },
      {
        property: "og:description",
        content:
          "Casa rural en Aljucén (Badajoz), a 15 km de Mérida, en el Camino de Santiago Vía de la Plata y junto al Parque Natural de Cornalvo. WiFi y parking gratis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Casa Rural La Plata | Aljucén, Mérida y Cornalvo",
      },
      {
        name: "twitter:description",
        content:
          "Casa rural en Aljucén (Badajoz), a 15 km de Mérida, en el Camino de Santiago Vía de la Plata y junto al Parque Natural de Cornalvo. WiFi y parking gratis.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Casa Rural La Plata",
          description:
            "Alojamiento con encanto en Aljucén, Extremadura. WiFi y parking gratis, a 15 km de Mérida.",
          url: "https://id-preview--071a932c-e943-43a1-815e-71f9365f3ca7.lovable.app/",
          address: {
            "@type": "PostalAddress",
            streetAddress: "9 Calle San Andrés",
            addressLocality: "Aljucén",
            addressRegion: "Badajoz",
            postalCode: "06894",
            addressCountry: "ES",
          },
          telephone: "+34691231248",
          email: "casarurallaplata@gmail.com",
          priceRange: "€€",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "9.3",
            reviewCount: "492",
            bestRating: "10",
          },
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "WiFi gratis", value: true },
            { "@type": "LocationFeatureSpecification", name: "Parking gratis", value: true },
            { "@type": "LocationFeatureSpecification", name: "Aire acondicionado", value: true },
            { "@type": "LocationFeatureSpecification", name: "Jardín", value: true },
            { "@type": "LocationFeatureSpecification", name: "Terraza", value: true },
          ],
        }),
      },
    ],
  }),
});

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "La casa", href: "#casa" },
  { label: "Habitaciones", href: "#habitaciones" },
  { label: "Zonas comunes", href: "#zonas-comunes" },
  { label: "Servicios", href: "#servicios" },
  { label: "Entorno", href: "#entorno" },
  { label: "Contacto", href: "#contacto" },
];

const commonAreaPhotos = [
  { src: img357572277, alt: "Salón común con sofá y televisión" },
  { src: img357572260, alt: "Salón-comedor con vigas de madera y cocina al fondo" },
  { src: img357572272, alt: "Cocina compartida totalmente equipada" },
  { src: img357572312, alt: "Cocina-salón compartido" },
  { src: img357572281, alt: "Zona de comedor y salón compartido" },
  { src: img357572288, alt: "Comedor con vigas de madera y acceso al salón" },
  { src: img367534576, alt: "Jardín con mesa de piedra y vistas a la iglesia de Aljucén" },
  { src: img367534587, alt: "Zona de comedor exterior con césped" },
  { src: img367534599, alt: "Terraza exterior con mesa y bancos de piedra" },
];

const rooms = [
  {
    title: "Habitación Doble Grande",
    description: "Espaciosa y luminosa, ideal para una estancia tranquila.",
    size: "20 m²",
    features: [
      { icon: BedDouble, text: "2 camas individuales" },
      { icon: Bath, text: "Baño privado" },
      { icon: Wind, text: "Aire acondicionado" },
      { icon: Tv, text: "TV de pantalla plana" },
      { icon: Coffee, text: "Lavavajillas" },
      { icon: Sun, text: "Zona de comedor exterior" },
    ],
    image: img367530038,
    photos: [
      { src: img367530082, alt: ""},
      { src: img367530078, alt: "" },
      { src: img367530060, alt: ""},
    ],
  },
  {
    title: "Habitación Doble con balcón",
    description: "Con balcón privado y vistas a la montaña y al pueblo.",
    size: "20 m²",
    features: [
      { icon: BedDouble, text: "2 camas individuales" },
      { icon: Home, text: "Balcón privado" },
      { icon: Mountain, text: "Vistas a la montaña" },
      { icon: Bath, text: "Baño privado" },
      { icon: Wind, text: "Aire acondicionado" },
      { icon: Wind, text: "Calefacción" },
    ],
    image: img367520354,
    photos: [
      { src: img367520365, alt: ""},
      { src: img367520139, alt: "" },
      { src: img367520394, alt: "" },
    ],
  },
  {
    title: "Habitación Doble con vistas",
    description: "Disfruta de las mejores vistas a la montaña extremeña.",
    size: "20 m²",
    features: [
      { icon: BedDouble, text: "2 camas individuales" },
      { icon: Mountain, text: "Vistas a la montaña" },
      { icon: MapPin, text: "Vistas a la ciudad" },
      { icon: Bath, text: "Baño privado" },
      { icon: Wind, text: "Aire acondicionado" },
      { icon: Droplets, text: "Secador de pelo" },
    ],
    image: img367528681,
    photos: [
      { src: img367528667, alt: ""},
      { src: img357572294, alt: "" },
      { src: img367528614, alt: "" },
    ],
  },
];

const services = [
  { icon: Wifi, label: "WiFi gratis", description: "Conexión en todas las estancias" },
  { icon: Car, label: "Parking gratis", description: "Aparcamiento en la calle" },
  { icon: Wind, label: "Aire acondicionado", description: "Climatización individual" },
  { icon: Trees, label: "Jardín", description: "Zona verde para relajarse" },
  { icon: Sofa, label: "Salón común", description: "Espacio compartido acogedor" },
  { icon: Sun, label: "Terraza", description: "Para disfrutar del buen tiempo" },
  { icon: ChefHat, label: "Cocina compartida", description: "Totalmente equipada" },
  { icon: Coffee, label: "Tetera/cafetera", description: "En todas las habitaciones" },
];

const testimonials = [
  {
    name: "Cristina",
    text: "La casa es muy nueva, con detalles bonitos y buena atención, cerca de Mérida, cómoda.",
  },
  {
    name: "Carlos",
    text: "Muy amplio, comodidad y muy bien amueblado y decorado, una pena que solo haya quedado a dormir.",
  },
  {
    name: "Deneb",
    text: "Sitio tranquilo, amplias habitaciones y un patio que si viajas con perros es de gran ayuda. Muy limpio, camas cómodas, a 15 min de Mérida.",
  },
  {
    name: "Mariano",
    text: "Excelentes instalaciones, repetiré sin duda alguna.",
  },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [commonAreasOpen, setCommonAreasOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="font-serif text-xl font-bold text-foreground sm:text-2xl">
            Casa Rural La Plata
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={PHONE_HREF}>
                <Phone className="mr-1.5 h-4 w-4" /> {PHONE_DISPLAY}
              </a>
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/50 bg-background px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={PHONE_HREF} onClick={() => setMobileMenuOpen(false)}>
                  <Phone className="mr-2 h-4 w-4" /> Llamar {PHONE_DISPLAY}
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative flex min-h-[90vh] items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img            
            src={heroCasa}
            alt="Fachada de Casa Rural La Plata en Aljucén"
            className="h-full w-full object-cover"
            width={1280}
            height={720}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary">
              <Star className="mr-1 h-3.5 w-3.5 fill-current" />
              9,3/10
            </Badge>
            <span className="text-sm text-white/90">492 comentarios · Fantástico</span>
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Casa Rural La Plata
          </h1>
          <p className="mt-4 font-serif text-xl italic text-white/90 sm:text-2xl md:text-3xl">
            Tu hogar en el corazón de Extremadura
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
            Alojamiento con encanto en Aljucén, a 15 km de Mérida. Disfruta de la tranquilidad, el confort y la
            hospitalidad extremeña en un entorno único.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
            >
              <a href={PHONE_HREF}>
                <Phone className="mr-2 h-5 w-5" /> Llamar ahora · {PHONE_DISPLAY}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 px-8 text-lg text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              <a href="#reservar">
                Formulario de reserva <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-white/80">
            Reserva directa por teléfono: Rápida y sin preocupaciones.
          </p>
        </div>
      </section>

      {/* Sobre la casa */}
      <section id="casa" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src={img367534281}
                alt="Detalle decorativo rústico de la casa"
                className="rounded-2xl shadow-xl"
                width={768}
                height={1024}
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Bienvenidos
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Un rincón de paz en Aljucén
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Casa Rural La Plata te ofrece una experiencia auténtica en el corazón de Extremadura. Nuestra
                casa combina una experiencia rústica y alejada de la vida urbana con todas las comodidades modernas para
                que tu estancia sea inolvidable.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Ubicada en el centro del pueblo de Aljucén, a solo 15 minutos de Mérida, es el punto de partida
                ideal para descubrir la naturaleza y la gastronomía de la zona.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-muted p-4 text-center">
                  <div className="font-serif text-2xl font-bold text-primary">9,3</div>
                  <div className="text-xs text-muted-foreground">Puntuación</div>
                </div>
                <div className="rounded-xl bg-muted p-4 text-center">
                  <div className="font-serif text-2xl font-bold text-primary">492</div>
                  <div className="text-xs text-muted-foreground">Opiniones</div>
                </div>
                <div className="rounded-xl bg-muted p-4 text-center">
                  <div className="font-serif text-2xl font-bold text-primary">9,6</div>
                  <div className="text-xs text-muted-foreground">Limpieza</div>
                </div>
                <div className="rounded-xl bg-muted p-4 text-center">
                  <div className="font-serif text-2xl font-bold text-primary">9,4</div>
                  <div className="text-xs text-muted-foreground">Ubicación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Habitaciones */}
      <section id="habitaciones" className="bg-muted/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Descansa</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Nuestras habitaciones
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Tres opciones diseñadas para tu descanso, todas con baño privado y las comodidades que necesitas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <Card key={room.title} className="overflow-hidden border-border bg-card">
                <button
                  type="button"
                  onClick={() => setActiveRoom(room.title)}
                  aria-label={`Ver más fotos de ${room.title}`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={room.image}
                    alt={room.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={1024}
                    height={768}
                    loading="lazy"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground">
                      <Expand className="h-4 w-4" /> Ver fotos
                    </span>
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                    {room.photos.length} fotos
                  </span>
                </button>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-xl">{room.title}</CardTitle>
                    <Badge variant="secondary">{room.size}</Badge>
                  </div>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {room.features.map((feature) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <li key={feature.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FeatureIcon className="h-4 w-4 text-primary" />
                          {feature.text}
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {rooms.map((room) => (
            <RoomGalleryDialog
              key={room.title}
              open={activeRoom === room.title}
              onOpenChange={(open) => setActiveRoom(open ? room.title : null)}
              title={room.title}
              size={room.size}
              description={room.description}
              photos={room.photos}
            />
          ))}
        </div>
      </section>

      {/* Servicios */}
      {/* Zonas comunes */}
      <section id="zonas-comunes" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Compartir</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Zonas comunes de la casa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Salón, cocina, comedor, jardín y terraza: espacios compartidos por las tres habitaciones para que
              te sientas como en casa.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commonAreaPhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setCommonAreasOpen(true)}
                aria-label={`Ver galería de zonas comunes: ${photo.alt}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={1024}
                  height={768}
                  loading="lazy"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground">
                    <Expand className="h-4 w-4" /> Ver fotos
                  </span>
                </span>
                {index === 0 && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                    {commonAreaPhotos.length} fotos
                  </span>
                )}
              </button>
            ))}
          </div>

          <RoomGalleryDialog
            open={commonAreasOpen}
            onOpenChange={setCommonAreasOpen}
            title="Zonas comunes"
            size="Uso compartido"
            description="Salón, cocina, comedor, jardín y terraza compartidos por las tres habitaciones."
            photos={commonAreaPhotos}
          />
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Comodidades</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Servicios e instalaciones
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Todo lo que necesitas para una estancia cómoda y relajante.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.label}
                  className="border-border bg-card text-center transition-shadow hover:shadow-md"
                >
                  <CardContent className="pt-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold">{service.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-muted p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground">En cada habitación</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {[
                  "Baño privado",
                  "TV de pantalla plana",
                  "Aire acondicionado",
                  "Calefacción",
                  "Secador de pelo",
                  "Artículos de aseo",
                  "Ropa de cama",
                  "Toallas",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <Bath className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-muted p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground">Zonas comunes</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {[
                  "Salón de uso común",
                  "Cocina compartida",
                  "Jardín",
                  "Terraza",
                  "Zona de comedor exterior",
                  "Parking gratis",
                  "WiFi gratis",
                  "Juegos de mesa",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <Tv className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="entorno" className="bg-muted/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Descubre</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Aljucén y su entorno
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Aljucén es un tranquilo pueblo extremeño, perfecto para explorar la zona. Su ubicación
              estratégica te permite disfrutar tanto del patrimonio histórico como de la naturaleza
              extremeña.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DISCOVER_ITEMS.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl bg-background shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <h3 className="font-serif text-lg font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <img
              src={imgIglesiaAljucen}
              alt="Iglesia de Aljucén y su entorno"
              className="rounded-2xl shadow-xl"
              width={1280}
              height={720}
              loading="lazy"
            />
            <div>
              <h3 className="font-serif text-2xl font-bold text-foreground">¿Dónde estamos?</h3>
              <p className="mt-3 text-muted-foreground">
                9 Calle San Andrés, 06894 Aljucén (Badajoz). A un paso del Camino de Santiago Vía de la
                Plata y del Parque Natural de Cornalvo.
              </p>
              <Button asChild size="lg" className="mt-6">
                <a
                  href="https://www.google.com/maps/place/Casa+rural+la+plata/@39.043433,-6.3329939,17z/data=!3m1!4b1!4m6!3m5!1s0xd1429e6f81d19ff:0xe194858a42ad8828!8m2!3d39.043433!4d-6.330419!16s%2Fg%2F11t0m51xtq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-5 w-5" />
                  Ver ubicación en Google Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Opiniones */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Opiniones</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Lo que dicen nuestros huéspedes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              492 comentarios nos avalan con una valoración de 9,3/10.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-lg italic text-foreground">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="mt-4 font-semibold text-primary">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solicitud de reserva */}
      <section id="reservar" className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Reserva directa</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Formulario de reserva
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              <h2 className="mt-3 font-serif text-2xl font-bold text-foreground sm:text-2xl">
              Obligatorio rellenar todos los campos y enviar después de concretar fecha de reserva por télefono.
              </h2>
              Rellena el formulario y te generamos un PDF con tu solicitud, listo para enviárnoslo por correo.
              ¿Algún problema? Llámanos al{" "}
              <a href={PHONE_HREF} className="font-semibold text-primary hover:underline">
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <ReservationForm />
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">
                Reservas
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">¿Hablamos?</h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/90">
                Reserva directamente con nosotros y consigue el mejor trato y las mejores condiciones. Estamos
                encantados de resolver tus dudas y ayudarte a planificar tu estancia.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p className="text-primary-foreground/90">9 Calle San Andrés, 06894 Aljucén, España</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Teléfono</h4>
                    <a href={PHONE_HREF} className="text-lg font-semibold hover:underline">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-foreground/90 hover:underline">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Horarios</h4>
                    <p className="text-primary-foreground/90">Entrada: 13:00 - 23:00</p>
                    <p className="text-primary-foreground/90">Salida: 08:00 - 11:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-primary-foreground py-7 text-lg font-bold text-primary shadow-lg hover:bg-primary-foreground/90 sm:w-auto sm:px-10"
                >
                  <a href={PHONE_HREF}>
                    <Phone className="mr-2 h-6 w-6" /> Llamar ahora · {PHONE_DISPLAY}
                  </a>
                </Button>
                <p className="text-sm text-primary-foreground/80">
                  Reserva directa por teléfono: Rápida y sin preocupaciones.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <a href="#reservar">
                      <CalendarCheck className="mr-2 h-5 w-5" /> Formulario de reserva
                    </a>
                  </Button>
                </div>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 underline underline-offset-4 hover:text-primary-foreground"
                >
                  O reservar en Booking.com <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-primary-foreground/10 p-8 backdrop-blur-sm">
              <h3 className="font-serif text-2xl font-bold">Información de reserva</h3>
              <p className="mt-4 text-primary-foreground/90">
                Para consultar disponibilidad y tarifas, contáctanos directamente. Te responderemos lo antes
                posible.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-4">
                  <CalendarCheck className="h-5 w-5" />
                  <span>Cancelación gratuita hasta 24 horas antes de la llegada</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-4">
                  <Car className="h-5 w-5" />
                  <span>Parking gratuito disponible</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-4">
                  <Wifi className="h-5 w-5" />
                  <span>WiFi gratuito en todas las instalaciones</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-4">
                  <Coffee className="h-5 w-5" />
                  <span>Habitaciones equipadas con tetera y cafetera</span>
                </div>
              </div>
              <a
                href={PHONE_HREF}
                className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-primary-foreground px-5 py-4 text-lg font-bold text-primary transition-opacity hover:opacity-90"
              >
                <Phone className="h-5 w-5" /> Llamar al {PHONE_DISPLAY}
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-1.5 text-sm text-primary-foreground/70 underline underline-offset-4 hover:text-primary-foreground"
              >
                Ver disponibilidad en Booking.com <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-foreground">Casa Rural La Plata</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                9 Calle San Andrés, 06894 Aljucén, Extremadura
              </p>
              <p className="mt-2 text-sm">
                <a href={PHONE_HREF} className="font-semibold text-primary hover:underline">
                  {PHONE_DISPLAY}
                </a>
                <span className="text-muted-foreground"> · </span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#casa" className="text-sm text-muted-foreground hover:text-primary">
                La casa
              </a>
              <a href="#habitaciones" className="text-sm text-muted-foreground hover:text-primary">
                Habitaciones
              </a>
              <a href="#reservar" className="text-sm text-muted-foreground hover:text-primary">
                Reservar
              </a>
              <a href="#contacto" className="text-sm text-muted-foreground hover:text-primary">
                Contacto
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground/70 hover:text-primary"
              >
                Booking.com
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Casa Rural La Plata. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}