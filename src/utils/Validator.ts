export class ValidatorService {
    checkEmptyAndNull (element) {
        if (typeof element != "object") {
            return element != undefined && element.length > 0
        } else {
            return true
        }
    }
}