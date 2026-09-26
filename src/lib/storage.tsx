export const getPlan = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem("fitlog-plan");

  return data ? JSON.parse(data) : [];
};

export const getSaved = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem("fitlog-saved");

  return data ? JSON.parse(data) : [];
};

export const addToPlan = (workout: any) => {
  const plan = getPlan();

  if (plan.length >= 5) {
    return false;
  }

  const alreadyAdded = plan.find(
    (item: any) => item.id === workout.id
  );

  if (alreadyAdded) {
    return false;
  }

  localStorage.setItem(
    "fitlog-plan",
    JSON.stringify([...plan, workout])
  );

  window.dispatchEvent(new Event("fitlog-update"));

  return true;
};

export const removeFromPlan = (id: any) => {
  const plan = getPlan();

  const newPlan = plan.filter(
    (item: any) => item.id !== id
  );

  localStorage.setItem(
    "fitlog-plan",
    JSON.stringify(newPlan)
  );

  window.dispatchEvent(new Event("fitlog-update"));
};

export const addToSaved = (workout: any) => {
  const saved = getSaved();

  const alreadySaved = saved.find(
    (item: any) => item.id === workout.id
  );

  if (alreadySaved) {
    return false;
  }

  localStorage.setItem(
    "fitlog-saved",
    JSON.stringify([...saved, workout])
  );

  window.dispatchEvent(new Event("fitlog-update"));

  return true;
};

export const removeFromSaved = (id: any) => {
  const saved = getSaved();

  const newSaved = saved.filter(
    (item: any) => item.id !== id
  );

  localStorage.setItem(
    "fitlog-saved",
    JSON.stringify(newSaved)
  );

  window.dispatchEvent(new Event("fitlog-update"));
};