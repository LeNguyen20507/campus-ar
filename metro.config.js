const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add GLB and other 3D model file extensions as asset extensions
config.resolver.assetExts.push(
  // 3D model formats
  'glb',
  'gltf',
  'obj',
  'mtl',
  'fbx',
  'dae',
  // ViroReact specific
  'vrx',
  'hdr',
);

module.exports = config;
