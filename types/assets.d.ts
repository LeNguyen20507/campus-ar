/**
 * Asset Type Declarations
 * 
 * Tells TypeScript how to handle various asset file types
 */

// 3D Model formats
declare module '*.glb' {
  const content: any;
  export default content;
}

declare module '*.gltf' {
  const content: any;
  export default content;
}

declare module '*.obj' {
  const content: any;
  export default content;
}

declare module '*.fbx' {
  const content: any;
  export default content;
}

// ViroReact specific formats
declare module '*.vrx' {
  const content: any;
  export default content;
}

declare module '*.hdr' {
  const content: any;
  export default content;
}

// Image formats (if not already declared)
declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}
