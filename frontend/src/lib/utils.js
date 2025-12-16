// utils.js or formatTime.js
export const formatMessageTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    
    if (isToday) {
      // Today: show time only (2:30 PM)
      return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      // Not today: show date and time
      const dateStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
      
      const timeStr = d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      
      return `${dateStr}, ${timeStr}`;
    }
  };
  
  // Short version (just time) for message bubbles
  export const formatMessageTimeShort = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  
  // Clean version without space (2:30PM instead of 2:30 PM)
  export const formatMessageTimeCompact = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).replace(" ", "");
  };
  
  // Date formatter for headers
  export const formatMessageDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (d.toDateString() === now.toDateString()) {
      return "Today";
    }
    
    if (d.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    // Within last 6 days
    if ((now - d) < 7 * 24 * 60 * 60 * 1000) {
      return d.toLocaleDateString("en-US", { weekday: "long" });
    }
    
    // This year
    if (d.getFullYear() === now.getFullYear()) {
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    }
    
    // Different year
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  
  // Telegram-like format: Shows only time for today, otherwise date + time
  export const formatMessageTimeTelegram = (date) => {
    const d = new Date(date);
    const now = new Date();
    
    const timeStr = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    
    // Today - just show time
    if (d.toDateString() === now.toDateString()) {
      return timeStr;
    }
    
    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${timeStr}`;
    }
    
    // Within last week
    if ((now - d) < 7 * 24 * 60 * 60 * 1000) {
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      return `${dayName}, ${timeStr}`;
    }
    
    // Older
    const dateFormat = d.getFullYear() === now.getFullYear() 
      ? { month: "short", day: "numeric" }
      : { month: "short", day: "numeric", year: "numeric" };
    
    const dateStr = d.toLocaleDateString("en-US", dateFormat);
    return `${dateStr}, ${timeStr}`;
  };