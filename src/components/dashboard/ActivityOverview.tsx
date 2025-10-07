import AppointmentsOverview from "./AppointmentsOverview";
import NextAppointment from "./NextAppointment";

function ActivityOverview() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <AppointmentsOverview />
      <NextAppointment />
    </div>
  );
}
export default ActivityOverview;
