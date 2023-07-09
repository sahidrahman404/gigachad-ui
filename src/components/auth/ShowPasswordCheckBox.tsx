import { atom, useAtom } from "jotai";
import { Checkbox } from "../ui/checkbox";

export const showPasswordAtom = atom(false);
export function ShowPasswordCheckBox() {
  const [showPassword, setShowPasswordAtom] = useAtom(showPasswordAtom);
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="showPasswordToggle"
        checked={showPassword}
        onClick={() => {
          setShowPasswordAtom((showState) => !showState);
        }}
      />
      <label
        htmlFor="showPasswordToggle"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show Password
      </label>
    </div>
  );
}
