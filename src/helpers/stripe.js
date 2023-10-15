import visa from "../assets/stripe_card/visa.png";
import americanexpress from "../assets/stripe_card/americanexpress.png";
import dinersclub from "../assets/stripe_card/dinersclub.jpg";
import discover from "../assets/stripe_card/discover.jpg";
import elo from "../assets/stripe_card/elo.png";
import hiper from "../assets/stripe_card/hiper.png";
import jcb from "../assets/stripe_card/jcb.png";
import mastercard from "../assets/stripe_card/mastercard.png";
import mir from "../assets/stripe_card/mir.png";
import unionpay from "../assets/stripe_card/unionpay.png";

export function getCardImage(type) {
    switch (type) {
        case "visa":
            return visa;
        case "mastercard":
            return mastercard;
        case "amex":
            return americanexpress;
        case "diners club":
            return dinersclub;
        case "discover":
            return discover;
        case "jcb":
            return jcb;
        case "unionpay":
            return unionpay;
        case "maestro":
            return mastercard;
        case "mir":
            return mir;
        case "elo":
            return elo;
        case "hiper":
            return hiper;
        case "hipercard":
            return hiper;
        default:
            return visa;
    }
}
