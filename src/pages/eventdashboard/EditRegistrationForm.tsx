import { Button } from "@/components/ui/button";
// import { BiCalendar, BiListCheck, BiListUl, BiMessageRoundedCheck, BiText, } from "react-icons/bi"
// import { MdOutlinePin } from "react-icons/md";
// import { MdOutlineCheckBox } from "react-icons/md";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  type:
    | "Text"
    | "Number"
    | "CheckboxGroup"
    | "RadioGroup"
    | "Textarea"
    | "Date"
    | "File"
    | "Select";
  options?: string[];
  required: boolean;
  allowEdit: boolean;
}

const EditRegistrationForm = () => {
  // State to hold the list of objects
  const [items, setItems] = useState<Item[]>([]);

  // Function to add an object to the list
  const addItem = () => {
    const newItem: Item = {
      id: items.length,
      name: "",
      type: "Text",
      required: false,
      allowEdit: true,
    };
    setItems([...items, newItem]);
  };

  // Function to edit an object in the list
  const editItem = (
    id: number,
    newName: string,
    type: Item["type"],
    newOptions: string[] | undefined,
    required: boolean,
    allowEdit: boolean
  ) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name: newName,
          type: type,
          options:
            type === "CheckboxGroup" ||
            type === "RadioGroup" ||
            type === "Select"
              ? newOptions
              : undefined,
          required: required,
          allowEdit: allowEdit,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    // Update IDs of remaining items to match their new indices
    const updatedItemsWithNewIds = updatedItems.map((item, index) => ({
      ...item,
      id: index,
    }));
    setItems(updatedItemsWithNewIds);
  };

  // Function to reorder items in the list
  const reorderItems = (oldIndex: number, newIndex: number) => {
    const updatedItems = [...items];
    const movedItem = updatedItems.splice(oldIndex, 1)[0];
    updatedItems.splice(newIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <span className="flex text-xl font-semibold m-5 ">
        Edit Registration Form
      </span>

      <div className="form-builder w-full flex flex-col gap-3 p-3">
        <Button className="w-[200px]" onClick={addItem}>
          Add Item
        </Button>
        <div className="fields-container flex flex-col gap-5">
          {items.map((item, index) => (
            <div
              className="flex flex-col gap-3 field border p-3 rounded-md items-center"
              key={item.id}
            >
              <div className="input-container w-full flex justify-start gap-3">
                <input
                  className="dark:bg-black border p-2 rounded-md"
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    editItem(
                      item.id,
                      e.target.value,
                      item.type,
                      item.options,
                      item.required,
                      item.allowEdit
                    )
                  }
                  placeholder="Name"
                />
                <select
                  className="dark:bg-black border p-2 rounded-md"
                  value={item.type}
                  onChange={(e) =>
                    editItem(
                      item.id,
                      item.name,
                      e.target.value as Item["type"],
                      item.options,
                      item.required,
                      item.allowEdit
                    )
                  }
                >
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                  <option value="CheckboxGroup">Checkbox Group</option>
                  <option value="RadioGroup">Radio Group</option>
                  <option value="Textarea">Textarea</option>
                  <option value="Date">Date</option>
                  <option value="File">File</option>
                  <option value="Select">Select</option>
                </select>
                {item.type === "CheckboxGroup" ||
                item.type === "RadioGroup" ||
                item.type === "Select" ? (
                  <input
                    className="dark:bg-black border p-2 rounded-md min-w-[400px]"
                    type="text"
                    value={item.options?.join(",")}
                    onChange={(e) =>
                      editItem(
                        item.id,
                        item.name,
                        item.type,
                        e.target.value.split(","),
                        item.required,
                        item.allowEdit
                      )
                    }
                    placeholder="Options (separate options with a comma , )"
                  />
                ) : null}
                <label className="flex justify-center items-center">
                  Required:
                  <input
                    className="dark:bg-black m-2"
                    type="checkbox"
                    checked={item.required}
                    onChange={(e) =>
                      editItem(
                        item.id,
                        item.name,
                        item.type,
                        item.options,
                        e.target.checked,
                        item.allowEdit
                      )
                    }
                  />
                </label>
                {/* <label>
                                    Allow Edit:
                                    <input className="border p-2 rounded"
                                    type="checkbox"
                                    checked={item.allowEdit}
                                        onChange={e => editItem(item.id, item.name, item.type, item.options, item.required, e.target.checked)}
                                    />
                                </label> */}
              </div>

              <div className="button-container flex gap-3">
                <Button onClick={() => deleteItem(item.id)}>Delete</Button>
                {index > 0 && (
                  <Button onClick={() => reorderItems(index, index - 1)}>
                    Move Up
                  </Button>
                )}
                {index < items.length - 1 && (
                  <Button onClick={() => reorderItems(index, index + 1)}>
                    Move Down
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="submit-button-container flex justify-between gap-5 p-5 border">
        <NavLink to="/eventdashboard">
          <Button className="rounded">Cancel</Button>{" "}
        </NavLink>
        <Button className="rounded">Save Changes</Button>
      </div>
    </div>
  );
};

export default EditRegistrationForm;
