import { apolloClient } from "@/graphql/apollo/apolloClient";
import { USERAUTH } from "@/graphql/account/queries";
function setCookie(cname, cvalue, hour) {
  const d = new Date();
  d.setTime(d.getTime() + hour * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
export async function readAuthcache() {
  if (getCookie("userState") && localStorage.getItem("Authorization"))
    return true;
  const res = await apolloClient.query({
    query: USERAUTH,
  });
  if (res.data.me) {
    setCookie("userState", true, 1);
    return true;
  } else {
    localStorage.removeItem("Authorization");
    return false;
  }
}
