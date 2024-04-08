import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SocietyDashBoardCardProps {
  title: string;
  value: number;
}

const SocietyDashBoardCard: React.FC<SocietyDashBoardCardProps> = ({
  title,
  value,
}) => {
  return (
    <Card className="w-50">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-center">{value}</div>
      </CardContent>
    </Card>
  );
};

export default SocietyDashBoardCard;
