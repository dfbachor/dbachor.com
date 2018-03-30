
function writeCookie(cName, cValue, expDate, cPath, cDomain, cSecure) {
	if (cName && cValue != "") {
		var cString = cName + "=" + escape(cValue);
		
		if(expDate) cString += ";expires=" + expDate.toGMTString();
		if(cPath)   cString += ";path=" + cPath;
		if(cDomain)   cString += ";domain=" + cDomain;
		if(cSecure)   cString += ";secure=" + cSecure;
		
		//alert(cString);
		document.cookie = cString;
	}
}

function retrieveCookie(cName) {
	if(document.cookie){
		var cookieArray = document.cookie.split("; ");
		for(var i = 0; i < cookieArray.length; i++) {
			if(cookieArray[i].split("=")[0] == cName) {
				return unescape(cookieArray[i].split("=")[1]);
			}
		}
	}
}

function removeCookie(cName) {
	
	if (document.cookie) {
		var cookiesArray = document.cookie.split("; ");
		for(var i = 0; i < cookiesArray.length; i++) {
		
			if(cookiesArray[i].split("=")[0] == cName) {
				document.cookie = cName + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
			}
		}
	}
}


function formatDateForMysql(date1) {
		return date1.getFullYear() + '-' +
			(date1.getMonth() < 9 ? '0' : '') + (date1.getMonth()+1) + '-' +
			(date1.getDate() < 10 ? '0' : '') + date1.getDate() + " " +
			date1.getHours() + ":" + 
			date1.getMinutes() + ":" +
			date1.getSeconds();
}



