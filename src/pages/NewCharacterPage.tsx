import {Character} from "../data/types.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";

type NewCharacterPageProps = {
    characters: Character[];
    addCharacter: (newCharacter: Character) => void;
}

type FormValues = {
    name: string;
    species: string;
    status: string;
    image: string;
};

export default function NewCharacterPage(props: Readonly<NewCharacterPageProps>) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: {
            image: "https://media.moemax.com/i/moemax/PIAeLRYyJ6zLOZSMvyILzAQw/?fmt=auto&%24hq%24=&w=1200"
        }
    });

    function onSubmit(data: FormValues) {
        // event.preventDefault();          The `handleSubmit` function from `react-hook-form` handles preventing the form's default behavior automatically.

        const newCharacter: Character = {
            id: generateId(),
            name: data.name,
            species: data.species,
            status: data.status,
            type: "",
            gender: "",
            origin: {
                name: "Unknown",
                url: ""
            },
            location: {
                name: "Unknown",
                url: ""
            },
            image: data.image,
            episode: [],
            url: "",
            created: new Date().toISOString()
        };

        postCharacter(newCharacter);
        navigate(`/characters/${newCharacter.id}`);
    }

    function generateId():number {
        if (props.characters.length === 0) return 1;

        return Math.max(
            ...props.characters.map(character => character.id)
        ) + 1;
    }

    function postCharacter(character: Character) {
        axios
            .post("https://rickandmortyapi.com/api/character", character)
            .then(response => console.log(response.data))
            .catch(error => {
                console.error("Network/API error:", error);
                props.addCharacter(character);
            });
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Name:
                <input
                    type="text"
                    placeholder="Enter name..."
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 2,
                            message: "Name must contain at least 2 characters"
                        },
                        maxLength: {
                            value: 30,
                            message: "Name must contain at most 30 characters"
                        }
                    })}
                />
            </label>

            {errors.name && <p>{errors.name.message}</p>}

            <label>
                Species:
                <input
                    type="text"
                    placeholder="Enter species..."
                    {...register("species", {
                        required: "Species is required"
                    })}
                />
            </label>

            {errors.species && <p>{errors.species.message}</p>}

            <label>
                Status:
                <input
                    type="text"
                    placeholder="Enter status..."
                    {...register("status", {
                        required: "Status is required",
                        validate: value =>
                            ["Alive", "Dead", "unknown"].includes(value) ||
                            "Status must be Alive, Dead or unknown"
                    })}
                />
            </label>

            {errors.status && <p>{errors.status.message}</p>}

            <label>
                Image:
                <input
                    type="text"
                    placeholder="Enter the link to the image..."
                    {...register("image")}
                />
            </label>

            <button type="submit" disabled={!isValid}>
                Add
            </button>
        </form>
    )
}