class Singleton {
    private static instance: Singleton;  
  
    private constructor() {
      // Private constructor to prevent direct instantiation
    }  
  
    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }  
  
    public doSomething(): void {
      console.log("Singleton instance performing an action.");
    }
  }