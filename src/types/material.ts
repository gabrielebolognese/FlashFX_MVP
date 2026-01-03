export type MaterialType =
  | 'matte'
  | 'glossy'
  | 'metallic'
  | 'glass'
  | 'neon'
  | 'holographic'
  | 'plastic';

export type ShadowType =
  | 'drop'
  | 'long'
  | 'soft'
  | 'hard'
  | 'inner'
  | 'ambient';

export type GlowType =
  | 'outer'
  | 'inner'
  | 'directional'
  | 'pulse'
  | 'rim';

export interface MatteMaterial {
  type: 'matte';
  color: string;
  opacity: number;
}

export interface GlossyMaterial {
  type: 'glossy';
  color: string;
  highlightStrength: number;
  highlightPositionX: number;
  highlightPositionY: number;
  glossSoftness: number;
  lightDirection: number;
}

export interface MetallicMaterial {
  type: 'metallic';
  color: string;
  reflectionColor: string;
  reflectionIntensity: number;
  highlightPositionX: number;
  highlightPositionY: number;
  glossSoftness: number;
  lightDirection: number;
}

export interface GlassMaterial {
  type: 'glass';
  color: string;
  opacity: number;
  edgeBrightness: number;
  blurStrength: number;
  refractionOffset: number;
}

export interface NeonMaterial {
  type: 'neon';
  color: string;
  coreBrightness: number;
  glowRadius: number;
  glowIntensity: number;
  flickerAmount: number;
}

export interface HolographicMaterial {
  type: 'holographic';
  baseColor: string;
  hueShiftSpeed: number;
  saturation: number;
  gradientAngle: number;
  shimmerIntensity: number;
}

export interface PlasticMaterial {
  type: 'plastic';
  color: string;
  glossStrength: number;
  softness: number;
  lightAngle: number;
}

export type Material =
  | MatteMaterial
  | GlossyMaterial
  | MetallicMaterial
  | GlassMaterial
  | NeonMaterial
  | HolographicMaterial
  | PlasticMaterial;

export interface DropShadow {
  type: 'drop';
  color: string;
  opacity: number;
  blur: number;
  offsetX: number;
  offsetY: number;
}

export interface LongShadow {
  type: 'long';
  angle: number;
  length: number;
  color: string;
  opacityDecay: number;
}

export interface SoftShadow {
  type: 'soft';
  blurRadius: number;
  spread: number;
  softness: number;
  color: string;
  opacity: number;
}

export interface HardShadow {
  type: 'hard';
  offsetX: number;
  offsetY: number;
  color: string;
  opacity: number;
}

export interface InnerShadow {
  type: 'inner';
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
  intensity: number;
}

export interface AmbientShadow {
  type: 'ambient';
  opacity: number;
  spread: number;
  color: string;
}

export type ShadowEffect =
  | DropShadow
  | LongShadow
  | SoftShadow
  | HardShadow
  | InnerShadow
  | AmbientShadow;

export interface OuterGlow {
  type: 'outer';
  color: string;
  radius: number;
  intensity: number;
  falloff: number;
}

export interface InnerGlow {
  type: 'inner';
  color: string;
  thickness: number;
  intensity: number;
}

export interface DirectionalGlow {
  type: 'directional';
  color: string;
  directionAngle: number;
  strength: number;
  spread: number;
}

export interface PulseGlow {
  type: 'pulse';
  color: string;
  minRadius: number;
  maxRadius: number;
  speed: number;
}

export interface RimLight {
  type: 'rim';
  color: string;
  thickness: number;
  brightness: number;
  angle: number;
}

export type GlowEffect =
  | OuterGlow
  | InnerGlow
  | DirectionalGlow
  | PulseGlow
  | RimLight;

export interface MaterialLayer {
  id: string;
  material: Material;
  shadows: ShadowEffect[];
  glows: GlowEffect[];
  enabled: boolean;
}

export function createDefaultMaterial(type: MaterialType): Material {
  switch (type) {
    case 'matte':
      return {
        type: 'matte',
        color: '#ffffff',
        opacity: 1,
      };
    case 'glossy':
      return {
        type: 'glossy',
        color: '#ffffff',
        highlightStrength: 0.5,
        highlightPositionX: 0.3,
        highlightPositionY: 0.3,
        glossSoftness: 0.7,
        lightDirection: 45,
      };
    case 'metallic':
      return {
        type: 'metallic',
        color: '#c0c0c0',
        reflectionColor: '#ffffff',
        reflectionIntensity: 0.8,
        highlightPositionX: 0.3,
        highlightPositionY: 0.3,
        glossSoftness: 0.7,
        lightDirection: 45,
      };
    case 'glass':
      return {
        type: 'glass',
        color: '#ffffff',
        opacity: 0.3,
        edgeBrightness: 0.8,
        blurStrength: 5,
        refractionOffset: 2,
      };
    case 'neon':
      return {
        type: 'neon',
        color: '#00ffff',
        coreBrightness: 1,
        glowRadius: 20,
        glowIntensity: 0.8,
        flickerAmount: 0,
      };
    case 'holographic':
      return {
        type: 'holographic',
        baseColor: '#ffffff',
        hueShiftSpeed: 1,
        saturation: 0.8,
        gradientAngle: 45,
        shimmerIntensity: 0.5,
      };
    case 'plastic':
      return {
        type: 'plastic',
        color: '#ffffff',
        glossStrength: 0.3,
        softness: 0.8,
        lightAngle: 45,
      };
  }
}

export function createMaterialLayer(type: MaterialType): MaterialLayer {
  return {
    id: `layer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    material: createDefaultMaterial(type),
    shadows: [],
    glows: [],
    enabled: true,
  };
}
