function showSpfxAppConfig(){
    console.clear();
    console.log('Checking SPFx app principals.  This may take a few seconds...');
    let spfxAppId=null, spfxAppHelperId = null;
    let options = {headers:{'accept':'application/json'}}
    let pageSPFxPrincipal = _spPageContextInfo.spfx3rdPartyServicePrincipalId
    let aadPortalPath = 'https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/';
    let spfxAppGraphUri = "https://developer.microsoft.com/en-us/graph/graph-explorer?request=applications%3F%24select%3DdisplayName%2Cid%2CappId%2CcreatedDateTime%2CdeletedDateTime%2CidentifierUris%2Cweb%26%24top%3D40%26%24filter%3DidentifierUris%2Fany(x%3Astartswith(x%2C'api%3A%2F%2F"+ _spPageContextInfo.aadTenantId +"%2Fmicrosoft.spfx3rdparty.com'))%26%24count%3Dtrue&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com&headers=W3sibmFtZSI6IkNvbnNpc3RlbmN5TGV2ZWwiLCJ2YWx1ZSI6ImV2ZW50dWFsIn1d"
    let spfxAppHelperGraphUri = "https://developer.microsoft.com/en-us/graph/graph-explorer?request=applications%3F%24select%3DdisplayName%2Cid%2CappId%2CcreatedDateTime%2CdeletedDateTime%2CidentifierUris%2Cweb%26%24top%3D40%26%24filter%3DidentifierUris%2Fany(x%3Astartswith(x%2C'https%3A%2F%2Fmicrosoft.spfx3rdpartyadmin.com'))%26%24orderby%3DdisplayName%26%24count%3Dtrue&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com&headers=W3sibmFtZSI6IkNvbnNpc3RlbmN5TGV2ZWwiLCJ2YWx1ZSI6ImV2ZW50dWFsIn1d"
    
    fetch('https://'+window.location.hostname +'/_api/SPOInternalUseOnly.SPOWebAppServicePrincipal/AppId',options)
        .then(response => response.json())
        .then(data => (spfxAppId = data.value))
        .then(()=>{
            fetch('https://'+window.location.host+'/_api/SPOInternalUseOnly.SPOWebAppServicePrincipal/AppHelperId', options)
                .then(response => response.json())
                .then(data => (spfxAppHelperId = data.value))
                .then(
                    () =>{
                            console.clear();
                            console.group("Page level SPFx Principal ID")
                            if(IsStrNullOrEmpty(pageSPFxPrincipal))
                            {
                                console.warn('Page has no value for SPFx Principal ID (spfx3rdPartyServicePrincipalId)')
                                console.warn('Use the Graph Explorer links below to check both principals')
                            }
                            else
                            {
                                //use console.group()  ... console.groupEnd() instead 
                                console.log('Page says SPFx Principal ID is ' + _spPageContextInfo.spfx3rdPartyServicePrincipalId +'\nCheck properties in AAD - '+ aadPortalPath +_spPageContextInfo.spfx3rdPartyServicePrincipalId+'\nEnsure the Display name is "SharePoint Online Client Extensibility Web Application Principal"')
                            }
                            console.groupEnd()
                            
                            console.group("SPO API - SPFx Principal ID")
                            if(spfxAppId)
                            {
                                //use console.group()  ... console.groupEnd() instead 
                                console.log('API says SPFx Principal ID is ' + spfxAppId + '\ncheck '+ aadPortalPath + spfxAppId)
                            }
                            else
                            {
                                //use console.group()  ... console.groupEnd() instead 
                                console.warn('SPO API did not find SPFX Principal\nCheck SPFx Principal with Graph Explorer - ' + spfxAppGraphUri + '\nEnsure the Display name is "SharePoint Online Client Extensibility Web Application Principal"')
                            }
                            console.groupEnd()
                            
                            console.group("SPO API - SPFx Principal Helper ID")
                            if(spfxAppHelperId)
                            {
                                //use console.group()  ... console.groupEnd() instead 
                                console.log('API says SPFx Principal Helper ID is ' + spfxAppHelperId + '\ncheck '+ aadPortalPath + spfxAppHelperId)
                            }
                            else
                            {      
                                //use console.group()  ... console.groupEnd() instead 
                                console.warn('SPO API did not find SPFX Principal Helper\nCheck SPFx Principal Helper with Graph Explorer - ' + spfxAppHelperGraphUri +'\nEnsure the Display name is "SharePoint Online Client Extensibility Web Application Principal Helper"')
                            }
                            console.groupEnd()
                        });
    });
};showSpfxAppConfig();