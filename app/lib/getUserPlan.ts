import { User } from "../types";
import { PLANS } from "./plan";

export function getUserPlan(user: User) {
  return PLANS[user.role]
}