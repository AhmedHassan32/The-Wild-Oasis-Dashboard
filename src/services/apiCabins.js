import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //https://sfxqhhlxkwiagdmihdlu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single(); // add single() after it cause data object will be array of objects

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id); // if you use single you won't need data[0] but data only
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }
}

export async function createCabin(newCabin) {
  //https://sfxqhhlxkwiagdmihdlu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single(); // add single() after it cause data object will be array of objects

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id); // if you use single you won't need data[0] but data only
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }
}

export async function editCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //https://sfxqhhlxkwiagdmihdlu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Edit cabin
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  // add single() after it cause data object will be array of objects

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id); // if you use single you won't need data[0] but data only
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
}

// const { data, error } = await supabase
//   .from("cabins")
//   .insert([{ some_column: "someValue", other_column: "otherValue" }])
//   .select();

// const avatarFile = event.target.files[0];
// const { data, error } = await supabase.storage
//   .from("avatars")
//   .upload("public/avatar1.png", avatarFile, {
//     cacheControl: "3600",
//     upsert: false,
//   });

// not nowwwwwwwwwww it was random function hhhhhh lol
// Allowing "Other policies under storage.objects" when uploading images
// 19 upvotes
// Hyunjung · Lecture 355 · 10 months ago
// (09:19)

// I may have skipped the policy part before but I leave a comment for those who could not upload images.
// When uploading images, you must enable both the bucket (e.g. cabin-images) policy and the storage.objects policy.
// Otherwise, 401 JWT error pops up.
// I enabled the insert policy of 'Other policies under storage.objects' under the bucket policies.
// Reference
// RLS policy permissions required:
// buckets table permissions: none
// objects table permissions: only insert when you are uploading new files and select, insert and update when you are upserting files

// getCabins with bash not javascript

// const res = await fetch(
//   `https://sfxqhhlxkwiagdmihdlu.supabase.co/rest/v1/cabins?select=*`,
//   {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       apikey: `${supabaseKey}`,
//       Authorization: `Bearer ${supabaseKey}`,
//     },
//   },
// );
// const data = await res.json();
// return data;

// export async function createCabin(newCabin) {
//   //https://sfxqhhlxkwiagdmihdlu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     "",
//   );
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // 1. Create cabin

//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select()
//     .single(); // add single() after it cause data object will be array of objects

//   if (error) {
//     console.log(error);
//     throw new Error("Cabin could not be created");
//   }

//   // 2. Upload image
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   // 3. Delete the cabin IF there was an error uploading image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id); // if you use single you won't need data[0] but data only
//     console.log(storageError);
//     throw new Error(
//       "Cabin image could not be uploaded and the cabin was not created",
//     );
//   }
// }
