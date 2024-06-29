export function generateUniqueId(baseName = 'el') {
    return `${baseName}-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
  }