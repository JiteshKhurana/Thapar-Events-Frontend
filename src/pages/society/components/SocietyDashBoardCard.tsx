import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SocietyDashBoardCardProps {
  title: string;
  value: number | string;
  color?: string;
}

const SocietyDashBoardCard: React.FC<SocietyDashBoardCardProps> = ({
  title,
  value,
  color,
}) => {
  return (
    <Card className="w-1/5">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-3xl font-bold text-center ${
            color ? color : "text-blue-500"
          } `}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocietyDashBoardCard;
