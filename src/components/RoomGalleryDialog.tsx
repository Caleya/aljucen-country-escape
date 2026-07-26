import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export type RoomPhoto = { src: string; alt: string };

type RoomGalleryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  size: string;
  description: string;
  photos: RoomPhoto[];
};

export function RoomGalleryDialog({
  open,
  onOpenChange,
  title,
  size,
  description,
  photos,
}: RoomGalleryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="font-serif text-2xl">{title}</DialogTitle>
            <Badge variant="secondary">{size}</Badge>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Carousel className="w-full">
          <CarouselContent>
            {photos.map((photo) => (
              <CarouselItem key={photo.src}>
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {photos.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>

        <p className="text-center text-sm text-muted-foreground">
          {photos.length} {photos.length === 1 ? "foto" : "fotos"} de esta estancia
        </p>
      </DialogContent>
    </Dialog>
  );
}
