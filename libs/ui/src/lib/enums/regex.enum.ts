// @dynamic
export class RegexEnum {
  public static EMAIL =
    // eslint-disable-next-line max-len
    /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static MOBILE_PHONE = /([6][0-9]{3}[-][0-9]{4})$/;
  public static HOME_PHONE = /([0-9]{3}[-][0-9]{4})/;
}
