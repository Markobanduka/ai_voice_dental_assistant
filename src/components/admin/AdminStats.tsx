import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, UserCheck, Clock } from "lucide-react";

interface AdminStatsProps {
  totalTrainers: number;
  activeTrainers: number;
  totalAppointments: number;
  completedAppointments: number;
}

function AdminStats({
  activeTrainers,
  totalTrainers,
  completedAppointments,
  totalAppointments,
}: AdminStatsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12">
      <Card className="border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Users className="size-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalTrainers}</div>
              <div className="text-sm text-muted-foreground">
                Total Trainers
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <UserCheck className="size-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{activeTrainers}</div>
              <div className="text-sm text-muted-foreground">
                Active Trainers
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="size-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalAppointments}</div>
              <div className="text-sm text-muted-foreground">
                Total Appointments
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Clock className="size-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{completedAppointments}</div>
              <div className="text-sm text-muted-foreground">
                Completed Appointments
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default AdminStats;
