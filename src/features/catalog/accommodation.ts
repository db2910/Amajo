// AMAJO's confirmed package policy: tours longer than one day include lodging.
export function includesAccommodation(durationDays: number) {
  return durationDays > 1;
}
