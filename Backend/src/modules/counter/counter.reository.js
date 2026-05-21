import Counter from "./counter.model.js";

const getNextOrderNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "order" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );

  return `ORD-${counter.value}`;
};

export { getNextOrderNumber };
