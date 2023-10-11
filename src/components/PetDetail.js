import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { deleteById, getPestsByID, upDateById } from "../api/pets";

const PetDetail = () => {
  const { petId } = useParams();

  const queryClient = useQueryClient();

  const { data: pet } = useQuery({
    queryKey: ["pet"],
    queryFn: () => getPestsByID(petId),
  });
  const { mutate: adoptPet } = useMutation({
    mutationFn: () => upDateById(pet.name, pet.type, pet.image, petId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pet"] }),
  });
  const { mutate: petD } = useMutation({
    mutationKey: ["petpet"],
    mutationFn: () => deleteById(petId),
    onSuccess: queryClient({ queryKey: ["petpet"], petId }),
  });
  console.log(pet);
  if (pet == undefined) {
    return <h1>There is no pet with the id: ${petId}</h1>;
  }

  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button
            onClick={adoptPet}
            onCanPlay={getPestsByID}
            className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5"
          >
            Adobt
          </button>

          <button
            onClick={petD}
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
