import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Module {
  id: string;
  title: string;
  progress: number;
  completed: boolean;
  lessons: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface LearningState {
  modules: Module[];
  currentModule: string | null;
  isLoading: boolean;
  error: string | null;
  setModules: (modules: Module[]) => void;
  updateProgress: (moduleId: string, progress: number) => void;
  completeLesson: (moduleId: string, lessonId: string) => void;
}

export const useLearningStore = create<LearningState>()(
  immer((set) => ({
    modules: [],
    currentModule: null,
    isLoading: false,
    error: null,
    setModules: (modules) =>
      set((state) => {
        state.modules = modules;
      }),
    updateProgress: (moduleId, progress) =>
      set((state) => {
        const module = state.modules.find((m) => m.id === moduleId);
        if (module) {
          module.progress = progress;
          module.completed = progress === 100;
        }
      }),
    completeLesson: (moduleId, lessonId) =>
      set((state) => {
        const module = state.modules.find((m) => m.id === moduleId);
        if (module) {
          const lesson = module.lessons.find((l) => l.id === lessonId);
          if (lesson) {
            lesson.completed = true;
            // Update module progress
            const completedLessons = module.lessons.filter((l) => l.completed).length;
            module.progress = (completedLessons / module.lessons.length) * 100;
            module.completed = module.progress === 100;
          }
        }
      }),
  }))
);