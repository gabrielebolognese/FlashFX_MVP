import { SpotlightPosition, TutorialStep } from '../types/tutorial';

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    target: 'toolbar',
    title: 'Welcome to the Toolbar',
    message: 'This is the Toolbar - your main workspace for adding shapes, text, and images to your canvas. Use these tools to create your design.',
    position: 'bottom'
  },
  {
    id: 2,
    target: 'image-button',
    title: 'Add Images',
    message: 'Click here to add images to your design - upload from computer, search Google Images, or generate with AI.',
    position: 'bottom'
  },
  {
    id: 3,
    target: 'layers-panel',
    title: 'Layers Panel',
    message: 'The Layers Panel shows every element on your canvas - click to select, drag to reorder, and manage visibility.',
    position: 'right'
  },
  {
    id: 4,
    target: 'properties-panel',
    title: 'Properties Panel',
    message: 'The Properties Panel lets you customize selected elements - change colors, sizes, positions, and more.',
    position: 'left'
  },
  {
    id: 5,
    target: 'settings-button',
    title: 'Editor Settings',
    message: 'Access Editor Settings to configure canvas size, project name, default shapes, and grid settings.',
    position: 'top'
  },
  {
    id: 6,
    target: 'edit-mode-button',
    title: 'Edit Mode',
    message: 'Click on "Edit" mode to access animation timelines and keyframe editing. Click it now to continue.',
    position: 'top',
    requiresAction: true,
    actionType: 'click'
  },
  {
    id: 7,
    target: 'general-timeline',
    title: 'General Timeline',
    message: 'The General Timeline shows all clips in your project. Each element appears as a clip that you can arrange and time.',
    position: 'top'
  },
  {
    id: 8,
    target: 'animation-timeline',
    title: 'Animation Timeline',
    message: 'The Animation Timeline is where you create keyframes for each shape to animate properties like position, rotation, and opacity.',
    position: 'top'
  },
  {
    id: 9,
    target: 'canvas',
    title: 'Create a Shape',
    message: 'Now create any shape using the toolbar. Once you create and select it, we\'ll continue to the next step.',
    position: 'bottom',
    requiresAction: true,
    actionType: 'create-shape'
  },
  {
    id: 10,
    target: 'edit-tab',
    title: 'Edit Tab',
    message: 'The Edit tab in the Properties Panel lets you add and edit keyframes for the selected element. Create smooth animations here.',
    position: 'left'
  },
  {
    id: 11,
    target: 'fx-tab',
    title: 'FX Tab',
    message: 'The FX tab provides preset animation keyframes. Apply professional effects to your elements with one click.',
    position: 'left'
  },
  {
    id: 12,
    target: 'download-button',
    title: 'Download Project',
    message: 'Download your project to save it on your computer. You can load it later to continue working.',
    position: 'top'
  },
  {
    id: 13,
    target: 'exit-button',
    title: 'Exit to Projects',
    message: 'Click Exit to return to the projects panel where you can manage all your projects. That\'s it - you\'re ready to create!',
    position: 'top'
  }
];

export const TUTORIAL_COMPLETED_KEY = 'flashfx_tutorial_completed';

export function getSpotlightPosition(target: string): SpotlightPosition | null {
  const element = document.querySelector(`[data-tutorial-target="${target}"]`);

  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  const padding = 8;

  return {
    top: rect.top - padding,
    left: rect.left - padding,
    width: rect.width + (padding * 2),
    height: rect.height + (padding * 2),
    borderRadius: 12
  };
}

export function getPanelPosition(
  spotlight: SpotlightPosition,
  position: 'top' | 'bottom' | 'left' | 'right',
  panelWidth: number = 400,
  panelHeight: number = 200
): { top: number; left: number } {
  const gap = 20;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  let top = 0;
  let left = 0;

  switch (position) {
    case 'bottom':
      top = spotlight.top + spotlight.height + gap;
      left = spotlight.left + (spotlight.width / 2) - (panelWidth / 2);
      break;
    case 'top':
      top = spotlight.top - panelHeight - gap;
      left = spotlight.left + (spotlight.width / 2) - (panelWidth / 2);
      break;
    case 'right':
      top = spotlight.top + (spotlight.height / 2) - (panelHeight / 2);
      left = spotlight.left + spotlight.width + gap;
      break;
    case 'left':
      top = spotlight.top + (spotlight.height / 2) - (panelHeight / 2);
      left = spotlight.left - panelWidth - gap;
      break;
  }

  left = Math.max(20, Math.min(left, windowWidth - panelWidth - 20));
  top = Math.max(20, Math.min(top, windowHeight - panelHeight - 20));

  return { top, left };
}

export function scrollElementIntoView(target: string): void {
  const element = document.querySelector(`[data-tutorial-target="${target}"]`);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }
}

export function isTutorialCompleted(): boolean {
  try {
    return localStorage.getItem(TUTORIAL_COMPLETED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setTutorialCompleted(completed: boolean): void {
  try {
    localStorage.setItem(TUTORIAL_COMPLETED_KEY, completed.toString());
  } catch (error) {
    console.error('Failed to save tutorial completion status:', error);
  }
}
