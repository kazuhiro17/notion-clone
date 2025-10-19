import { ChevronsLeftRight, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";
import { Item } from "./Item";
import { SecureUser } from "@/modules/auth/auth.repository";

type Props = {
  user: SecureUser;
  signout: () => void;
};

const UserItem: FC<Props> = ({ user, signout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
          role="button"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <span className="text-start font-medium line-clamp-1">
              {user.userName} さんのノート
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex gap-x-2 items-center">
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">{user.userName}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="w-full cursor-pointer text-muted-foreground"
          asChild
        >
          <Item label="ログアウト" icon={LogOut} onClick={signout} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
