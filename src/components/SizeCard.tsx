import { AcaiSize } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SizeCardProps {
  size: AcaiSize;
  onCustomize: (size: AcaiSize) => void;
}

const SizeCard = ({ size, onCustomize }: SizeCardProps) => {
  return (
    <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 border border-border">
      <div className="w-full h-64 bg-muted">
        <img
          alt={size.label}
          className="w-full h-full object-cover object-top"
          src={size.image}
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-card-foreground mb-2">{size.label}</h3>
        <p className="text-3xl font-bold text-primary mb-4">
          R$ {size.price.toFixed(2).replace('.', ',')}
        </p>
        <Button
          onClick={() => onCustomize(size)}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
        >
          Personalizar
        </Button>
      </CardContent>
    </Card>
  );
};

export default SizeCard;
