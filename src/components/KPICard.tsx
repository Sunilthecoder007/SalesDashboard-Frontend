import { Card, CardContent } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  icon: string;
  iconColor: string;
}

export function KPICard({ title, value, icon: Icon, iconColor }: KPICardProps) {
  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 ">
            <div className="w-20 h-20  flex items-center justify-center">
            <img src={Icon} className="w-16" />
          </div>
          </div>
          <div>
            <p className="text text-foreground text-lg font-medium">{title}</p>
            <p className="text-3xl font-bold text-card-foreground">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}