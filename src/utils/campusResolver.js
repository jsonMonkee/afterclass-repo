import { campuses, DEFAULT_CAMPUS_ID } from '../config/campuses';

/**
 * Resolves the active campus context based on host header, subdomain, or query param
 * Examples:
 *   auk.afterclass.com -> 'auk'
 *   delhi.afterclass.com -> 'delhi'
 *   localhost:3000?campus=delhi -> 'delhi'
 *   fallback -> 'auk'
 */
export function resolveCampusFromHost(hostHeader = '', queryCampus = '') {
  if (queryCampus && campuses[queryCampus]) {
    return campuses[queryCampus];
  }

  if (hostHeader) {
    const cleanHost = hostHeader.toLowerCase().split(':')[0];
    const parts = cleanHost.split('.');
    
    // Check if first segment matches a registered campus subdomain
    if (parts.length > 1 && campuses[parts[0]]) {
      return campuses[parts[0]];
    }
  }

  return campuses[DEFAULT_CAMPUS_ID];
}
