/**
 * A mapping of crime and user-related image keys to their respective imported image assets.
 *
 * Each key represents a specific crime category or user icon, and the value is the imported image asset
 * associated with that category. This object is used to easily retrieve the correct image for a given
 * crime type or user-related context within the application.
 *
 * @example
 * import { images } from 'constants/images';
 * const violentCrimeImage = images["violent-crime"];
 *
 * @remarks
 * Some keys have multiple variants (e.g., "criminal-damage-arson" and "crminal-damage-and-arson")
 * to account for different possible spellings or usages in the application.
 */
import violentCrime from "assets/images/violent-crime.png";
import burglary from "assets/images/burglary.png";
import robbery from "assets/images/robbery.png";
import drugs from "assets/images/drugs.png";
import publicOrder from "assets/images/public-order.png";
import vehicleCrime from "assets/images/vehicle-crime.png";
import theft from "assets/images/theft.png";
import criminalDamage from "assets/images/criminal-damage.png";
import antisocialBehaviour from "assets/images/anti-social-behaviour.png";
import otherCrime from "assets/images/other-crime.png";
import theftFromThePerson from "assets/images/theft-from-the-person.png";
import possessionOfWeapons from "assets/images/possession-of-weapons.png";
import shoplifting from "assets/images/shoplifting.png";
import bikeTheft from "assets/images/bike-theft.png";
import bicycleTheft from "assets/images/bicycle-theft.png";
import arson from "assets/images/arson.png";
import order from "assets/images/order.png";
import miscCrime from "assets/images/misc-crime.png";
import miscellaneousCrime from "assets/images/miscellaneous-crime.png";
import fraud from "assets/images/fraud.png";
import weapons from "assets/images/weapons.png";
import criminalDamageAndArson from "assets/images/criminal-damage-arson.png";
import criminalDamageArson from "assets/images/criminal-damage-arson.png";
import comingSoon from "assets/images/coming-soon.png";
import user from "assets/images/user.png";

export const images = {
  "violent-crime": violentCrime,
  violence: violentCrime,
  burglary,
  robbery,
  drugs,
  "public-order": publicOrder,
  "vehicle-crime": vehicleCrime,
  theft,
  "criminal-damage": criminalDamage,
  "anti-social-behaviour": antisocialBehaviour,
  "other-crime": otherCrime,
  "theft-from-the-person": theftFromThePerson,
  "possession-of-weapons": possessionOfWeapons,
  shoplifting,
  "bike-theft": bikeTheft,
  "bicycle-theft": bicycleTheft,
  arson,
  order,
  "misc-crime": miscCrime,
  "miscellaneous-crime": miscellaneousCrime,
  fraud,
  weapons,
  "criminal-damage-arson": criminalDamageAndArson,
  "crminal-damage-and-arson": criminalDamageArson,
  "coming-soon": comingSoon,
  user: user,
};
