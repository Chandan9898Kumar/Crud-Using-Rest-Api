
//                                               Regular Expression Helper


const MobileRegexPattern = /^[6-9][0-9]{9}$/;

const MobileRegexNewPattern = /(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d/;

const UsernamePattern = /^(?=.{3,32}$)([a-zA-Z][a-zA-Z0-9_]+)[^_]$/;

const BackendUsernameRegexPattern = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,32}[a-zA-Z0-9]$/;

const EmailRegexPattern =
  /^[-a-zA-Z0-9~!$%^&*_=+}{\'?]+(\.[-a-zA-Z0-9~!$%^&*_=+}{\'?]+)*@([a-zA-Z0-9][-a-zA-Z0-9]*(\.[-a-zA-Z0-9]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|in|global|fit|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?/;

const TitlePattern = /^[A-Za-z ]+$/;

const GSTNumberRegexPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const OTPRegexPattern = /^\d{5}$/;

const WebsiteRegexPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,15}(:[0-9]{1,5})?(\/.*)?$/;

const imagePattern = /\.(jpe?g|png|gif|bmp|svg)+/i;

const skypeIDPattern = /^[a-zA-Z][a-zA-Z0-9\.,\-_]{5,31}$/;

const facebookPattern = /(http(s)?:\/\/)(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(.+)/;

const linkedinPattern = /^(http(s)?:\/\/)([\w]+\.)?linkedin\.com\/(.+)\/(.+)$/;

const glassdoorPattern = /(http(s)?:\/\/)(?:www\.)?glassdoor(\.com|\.co\.in)\/(.+)/;

const twitterPattern = /(http(s)?:\/\/)(?:www\.)?twitter\.com\/(.+)/;

const NumericPattern = /^(0|[1-9][0-9]*)$/;

const LinkedinRegexPattern = /^((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d&#?=-])+\/?){1,}))$/;

const IFSCRegexPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const BankAccountNumberRegexPattern = /^[0-9]{7,18}$/;

const DiscountCouponRegex = /^(?=.{3,32}$)([a-zA-Z0-9_-]+)$/;

const isMobile = (text) => MobileRegexNewPattern.test(text);

const isEmail = (text) => EmailRegexPattern.test(text);

const isURL = (text) => WebsiteRegexPattern.test(text);

const GenericEmails = [
  "aol.com",
  "comcast.net",
  "facebook.com",
  "gmail.com",
  "googlemail.com",
  "google.com",
  "hotmail.com",
  "mac.com",
  "me.com",
  "mail.com",
  "msn.com",
  "live.com",
  "yahoo.com",
  "hushmail.com",
  "icloud.com",
  "inbox.com",
  "lavabit.com",
  "outlook.com",
  "pobox.com",
  "rocketmail.com",
  "safe-mail.net",
  "wow.com",
  "ygm.com",
  "ymail.com",
  "fastmail.fm",
  "yandex.com",
  "naver.com",
  "daum.net",
  "nate.com",
  "yahoo.co.in",
];

export {
  BackendUsernameRegexPattern,
  BankAccountNumberRegexPattern,
  DiscountCouponRegex,
  EmailRegexPattern,
  GSTNumberRegexPattern,
  GenericEmails,
  IFSCRegexPattern,
  LinkedinRegexPattern,
  MobileRegexNewPattern,
  MobileRegexPattern,
  NumericPattern,
  OTPRegexPattern,
  TitlePattern,
  UsernamePattern,
  WebsiteRegexPattern,
  facebookPattern,
  glassdoorPattern,
  imagePattern,
  isEmail,
  isMobile,
  isURL,
  linkedinPattern,
  skypeIDPattern,
  twitterPattern,
};