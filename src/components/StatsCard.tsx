import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  title: string;
  amount: number;
}

const StatsCard = ({ title, amount }: CardProps) => {
  return (
    <Card className="flex-1 rounded-xl bg-gray-50 dark:bg-card shadow-[2px_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_8px_rgba(0,0,0,0.2)] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end items-baseline space-x-2">
          <span className="text-4xl font-bold text-foreground">
            ₹ {amount.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
