class DASHBOARD {
    private root = 'https://gwi-tasks.vercel.app';

    AUTH = this.root;
    HOME = `${this.root}/Home`;
    ME = `${this.root}/Me`;
    TASKS = `${this.root}/tasks`;
    TIME_BLOCKING = `${this.root}/time-blocking`;
    CUSTOMIZE = `${this.root}/customize`;
  }
  
  export const DASHBOARD_PAGES = new DASHBOARD();