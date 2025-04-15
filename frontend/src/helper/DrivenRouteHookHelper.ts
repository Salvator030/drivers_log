import { Address, DrivenRoute, FullValueRoute, Route } from "../types";

//alle daten zwieschen end und anfangs datum
export function getAllDates(
  datesRangeValue: [Date | null, Date | null]
): Date[] {
  const startDate: Date | null = datesRangeValue[0]
    ? new Date(datesRangeValue[0])
    : null;
  const endDate: Date | null = datesRangeValue[1]
    ? new Date(datesRangeValue[1])
    : null;
  const dateList: Date[] = [];

  if (startDate && endDate) {
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateList.push(new Date(currentDate)); // Clone des Datums
      currentDate.setDate(currentDate.getDate() + 1); // Nächster Tag
    }
  } else if (startDate) {
    dateList.push(new Date(startDate));
  }
  return dateList;
}

export function toFullDateString(date: Date): string {
  date = new Date(date)
  return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
}

export function fullValueRoute(routes: Route[], drivenRoute: DrivenRoute, addresses: Address[]):FullValueRoute | null {
     const route = routes?.find(
                (route, index) => route.routeId === drivenRoute.routeId
              );
    
              const routeId = route?.routeId;
              const startAddress = addresses?.find(
                (address: Address) => address.id === route?.startAddressId
              );
              const endAddress = addresses?.find(
                (address: Address) => address.id === route?.endAddressId
              );
              const distance = route?.distance;
    
              if (!routeId || !startAddress || !endAddress || !distance)
                return null;
              const fullRoute: FullValueRoute = {
                routeId: routeId,
                startAddress: startAddress,
                endAddress: endAddress,
                distance: distance ?? 0,
              };
    
              const date = new Date(drivenRoute.date);
              console.log("105: ", date);
    
    
              const title = date.getMonth() + "." + date.getFullYear();
    
              return fullRoute;
}