export const checkMobile = () => {
  const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  // alert(varUA);
  if (varUA.indexOf("android") > -1) {
    if (varUA.indexOf("naver") != -1) {
      //안드로이드 네이버
      return "phoneNaver";
    } else if (varUA.indexOf("samsungbrowser") != -1) {
      //안드로이드 삼성
      return "phoneSamsung";
    } else if (varUA.indexOf("kakao") > -1) {
      return "kakao";
    }
    //네이버, 삼성 아닌 안드로이드
    return "android";
  } else if (
    varUA.indexOf("iphone") > -1 ||
    varUA.indexOf("ipad") > -1 ||
    varUA.indexOf("ipod") > -1
  ) {
    //IOS
    return "IOS";
  } else {
    //아이폰, 안드로이드 외
    return "other";
  }
};
