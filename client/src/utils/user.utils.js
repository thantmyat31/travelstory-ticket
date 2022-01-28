export const getUserRoleForNavigationPath = (user) => {
    let userRole = '';
	if(user) {
		if(user?.role === 'master_admin' || user?.role === 'admin') {
			userRole = 'admin';
		}  else {
			userRole = user.role;
		}
	} else {
		userRole = '';
	}
    return userRole;
}