import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Menu, MenuItem } from '@mui/material';

export default function CheckboxList({ userList, currentUserId, onInvite }: { userList: any[], currentUserId: string, onInvite?: (userId: String) => void }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = React.useState<any>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, user: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };


    React.useEffect(() => {

    }, [userList, anchorEl]);



    function onSelectMenuItem(event: React.MouseEvent<HTMLLIElement, MouseEvent>): void {
        const value = event.currentTarget.attributes.getNamedItem("value")?.value;
        switch (value) {
            case "INVITE":
                console.log("Invite", { selectedUser });
                onInvite?.(selectedUser.id);
                break;
            default:
                break;
        }
        handleClose();
    }

    return (
        <>
            <List sx={{ width: '100%' }}>
                {userList.filter(u => u.id != currentUserId).map((user) => {
                    const labelId = `checkbox-list-label-${user.id}`;

                    return (
                        <ListItem
                            key={user.id}
                            sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <CommentIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={(evt) => handleClick(evt, user)} dense component="button">

                                <ListItemText id={labelId} primary={user.username} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}

            </List>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem value={"INVITE"} onClick={onSelectMenuItem}>Invite</MenuItem>
            </Menu></>
    );
}