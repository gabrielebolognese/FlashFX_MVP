import React from 'react';
import { Palette, Film, Download, FolderOpen, HelpCircle, LogOut, Save, Settings, Zap } from 'lucide-react';
import { LayoutMode } from '../../hooks/useLayoutMode';

interface LayoutBarProps {
  currentMode: LayoutMode;
  onModeChange: (mode: LayoutMode) => void;
  isTransitioning: boolean;
  onSaveProject?: () => void;
  onLoadProject?: () => void;
  onStartTutorial?: () => void;
  onExitToHome?: () => void;
  onSaveCurrentProject?: () => void;
  onOpenSettings?: () => void;
  onRequestAdvancedMode?: () => void;
}

const LayoutBar: React.FC<LayoutBarProps> = ({
  currentMode,
  onModeChange,
  isTransitioning,
  onSaveProject,
  onLoadProject,
  onStartTutorial,
  onExitToHome,
  onSaveCurrentProject,
  onOpenSettings,
  onRequestAdvancedMode
}) => {
  const handleModeChange = (mode: LayoutMode) => {
    if (mode === 'advanced' && currentMode !== 'advanced' && onRequestAdvancedMode) {
      const hideWarning = localStorage.getItem('hideAdvancedModeWarning') === 'true';
      if (hideWarning) {
        onModeChange(mode);
      } else {
        onRequestAdvancedMode();
      }
    } else {
      onModeChange(mode);
    }
  };
  return (
    <div
      className="w-full flex items-center justify-between px-4 backdrop-blur-xl border-t py-2"
      style={{
        backgroundColor: 'rgba(31, 41, 55, 0.5)',
        borderColor: 'rgba(55, 65, 81, 0.5)'
      }}
    >
      <div className="flex items-center gap-2">
        {onLoadProject && (
          <button
            onClick={onLoadProject}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
            title="Load Project"
          >
            <FolderOpen className="w-4 h-4" />
            <span>Load</span>
          </button>
        )}
        {onSaveProject && (
          <button
            onClick={onSaveProject}
            data-tutorial-target="download-button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
            title="Download Project"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        )}
        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            data-tutorial-target="settings-button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
            title="Editor Settings"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        )}
      </div>

      <div
        className="flex items-center gap-1 rounded-lg p-1 border"
        style={{
          backgroundColor: 'rgba(17, 24, 39, 0.8)',
          borderColor: 'rgba(55, 65, 81, 0.5)'
        }}
      >
        <button
          onClick={() => handleModeChange('design')}
          disabled={isTransitioning}
          className={`
            flex items-center justify-center gap-2 px-6 py-2 rounded-md font-medium text-sm
            transition-all duration-200
            ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          style={currentMode === 'design'
            ? { backgroundColor: 'rgba(55, 65, 81, 0.9)', color: '#ffffff' }
            : { color: '#9CA3AF' }
          }
          onMouseEnter={(e) => {
            if (currentMode !== 'design' && !isTransitioning) {
              e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.4)';
              e.currentTarget.style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (currentMode !== 'design') {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#9CA3AF';
            }
          }}
        >
          <Palette className="w-4 h-4" />
          <span>Design</span>
        </button>

        <button
          onClick={() => handleModeChange('edit')}
          disabled={isTransitioning}
          data-tutorial-target="edit-mode-button"
          className={`
            flex items-center justify-center gap-2 px-6 py-2 rounded-md font-medium text-sm
            transition-all duration-200
            ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          style={currentMode === 'edit'
            ? { backgroundColor: 'rgba(55, 65, 81, 0.9)', color: '#ffffff' }
            : { color: '#9CA3AF' }
          }
          onMouseEnter={(e) => {
            if (currentMode !== 'edit' && !isTransitioning) {
              e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.4)';
              e.currentTarget.style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (currentMode !== 'edit') {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#9CA3AF';
            }
          }}
        >
          <Film className="w-4 h-4" />
          <span>Edit</span>
        </button>

        <button
          onClick={() => handleModeChange('advanced')}
          disabled={isTransitioning}
          className={`
            flex items-center justify-center gap-2 px-6 py-2 rounded-md font-medium text-sm
            transition-all duration-200
            ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          style={currentMode === 'advanced'
            ? { backgroundColor: 'rgba(55, 65, 81, 0.9)', color: '#ffffff' }
            : { color: '#9CA3AF' }
          }
          onMouseEnter={(e) => {
            if (currentMode !== 'advanced' && !isTransitioning) {
              e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.4)';
              e.currentTarget.style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (currentMode !== 'advanced') {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#9CA3AF';
            }
          }}
        >
          <Zap className="w-4 h-4" />
          <span>Advanced</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {onStartTutorial && (
          <button
            onClick={onStartTutorial}
            data-tutorial-target="tutorial-button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
            title="Start Tutorial"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Tutorial</span>
          </button>
        )}
        {onSaveCurrentProject && (
          <button
            onClick={onSaveCurrentProject}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30 transition-all"
            title="Save Project"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        )}
        {onExitToHome && (
          <button
            onClick={onExitToHome}
            data-tutorial-target="exit-button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all"
            title="Exit to Home"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LayoutBar;
