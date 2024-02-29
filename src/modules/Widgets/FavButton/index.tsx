/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import Api from "../../../services/Api";
import { UserContext } from "@/modules/provider/user-info-provider";


const FavButton = ({ productID }: { productID: string }) => {
    const [liked, setLiked] = useState(false);
    const [favLoading, setFavLoading] = useState(false);
    const { nftUser, loggedIn } = useContext(UserContext);

    const fetchData = async () => {
        setFavLoading(true)
        Api.instance.products.productsControllerMyLikedProducts().then((res) => {
            setLiked(res.data.some((item: any) => item.id === productID));
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => { setFavLoading(false); });
    };

    const handleFavorite = async () => {
        if (nftUser) {
            setFavLoading(true);
            (liked ? Api.removeLike(productID) : Api.createLike(productID)).then(() => {
                setLiked(!liked);
                if (liked)
                    toast.success("Removed from favorite successfully")
                else
                    toast.success("Added to favorite successfully")
            })
                .catch((err) => {
                    toast.error("Something went wrong");
                })
                .finally(() => { setFavLoading(false); });
        }
        else {
            toast.error("Please connect your wallet")
        }
    }

    useEffect(() => {
        if (loggedIn)
            fetchData();
    }, [loggedIn]);

    return <a
        onClick={() => !favLoading && handleFavorite()}
        className="absolute top-[20px] bg-white xl:w-[65px] xl:h-[65px] w-[45px] h-[45px] rounded-full flex justify-center items-center shadow-lg right-[30px]"
        style={{ cursor: "pointer", visibility: loggedIn ? "visible" : "hidden" }}
    >
        <i className="fa-regular text-[#000E54] text-[25px] fa-heart" />
        {favLoading ? <AiFillHeart size={35} color={"gray"} /> : liked ? <AiFillHeart size={35} color={"red"} /> : <AiOutlineHeart size={35} />}

    </a>


}

export default FavButton;