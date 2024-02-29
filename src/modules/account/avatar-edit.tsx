import { Avatar, Box, Input } from "@chakra-ui/react";
import { useState } from "react";

export function AvatarEdit({nftUser, onChange} : any) {
    
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        onChange(file)
        }

    };

    return (
        <Box>
            <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="avatar-input"
            />
            <label htmlFor="avatar-input">
                <Avatar
                size="xl"
                bg="primary.100"
                src={image ? image : nftUser?.avatarUrl}
                cursor="pointer"
                _hover={{ opacity: 0.7 }}
                />
            </label>
        </Box>
        // <Avatar
        //     size={'2xl'}
        //     name="profile picture"
        //     src={`${nftUser?.avatarUrl}`}
        // />
    )
}