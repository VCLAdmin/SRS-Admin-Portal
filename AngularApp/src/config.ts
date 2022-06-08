export const config = {
  apiUrl: 'http://ui-lib-demo-api.herokuapp.com',
  authRoles: {
    sa: ['SRSAdministrator'], // Only Super Admin has access
    admin: ['SA', 'Admin','SRSAdministrator'], // Only SA & Admin has access
    editor: ['SA','SRSAdministrator', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    user: ['SA', 'SRSAdministrator','Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    guest: ['SA', 'SRSAdministrator','Admin', 'Editor', 'User', 'Guest'] // Everyone has access
  }
}