<template>
    <div id="main">
        <div class="flex justify-end pb-8">
            <p class="text-2xl font-bold">{{title}}</p>
        </div>
        <div class="flex justify-between">

            <div class="flex items-center mt-2 mb-6">
                <svg class="w-4 h-4 fill-current text-red-500 ml-4 z-10" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24" fill="black">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input type='text' placeholder="Buscar persona" v-model="search" v-on:keyup.enter="setSearch"
                       class="w-full -ml-8 pl-10 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-white"/>

            </div>

            <div>
                <button type="button" v-on:click="showModal"
                        class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg">
                    Nuevo contacto
                </button>
            </div>
        </div>
        <div class="w-full h-40">


            <div v-if="loading" class="flex space-x-4 justify-center">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20">
                </div>
            </div>

            <div v-if="!loading">
                <div class="bg-white px-4 py-4 flex my-2 rounded-lg shadow" v-for="i in users" v-bind:key="i.id">
                    <div class="w-24 pr-5">
                        <a href="#" class="mb-4">
                            <img v-if="i.profile===null"
                                 class="rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
                                 src="../assets/logo.png" alt="">
                            <img v-if="i.profile!==null"
                                 class="rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
                                 v-bind:src="i.profile.imag_profile" alt="">
                        </a>
                    </div>
                    <div class="w-1/4 pr-5 text-left">
                        <p class="text-base font-bold" v-bind:id="'info_fullname_'+i.id">
                            {{i.first_name}}
                        </p>
                        <input style="display: none" class="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                               type="text" v-bind:id="'fullname_'+i.id">
                        <p class="text-sm" v-on:click="deleteUser(i.id)">Eliminar</p>
                    </div>
                    <div class="w-4/5 pr-5">
                        <p class="text-left" v-bind:id="'info_description_'+i.id">{{i.description}}</p>
                        <textarea style="display: none" class="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                                  v-bind:id="'description_'+i.id"></textarea>
                    </div>
                    <div class="pr-2">
                        <span v-on:click="edit(i.id)" v-bind:id="'edit_'+i.id">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>
                        </span>
                        <span style="display: none" v-bind:id="'save_'+i.id" v-on:click="saveUser(i.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                 fill="currentColor">
  <path fill-rule="evenodd"
        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
        clip-rule="evenodd"/>
</svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <ul v-for="l in links" v-bind:key="l.id" class="inline">
                    <li class="inline-grid">
                        <span class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg"
                              v-on:click="linkPages(l.url)">
                                    <p v-html="l.label"></p>
                                </span>
                    </li>
                </ul>
            </div>
            <div class="flex justify-start">

                <div v-if="showAlert" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title"
                     role="dialog"
                     aria-modal="true">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                             aria-hidden="true"></div>

                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>


                        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div class="bg-red-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div
                                        class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-100 bg-red-700 ">
                                    <div slot="avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round"
                                             stroke-linejoin="round" class="feather feather-alert-octagon w-5 h-5 mx-2">
                                            <polygon
                                                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                    </div>
                                    <div class="text-xl font-normal  max-w-full flex-initial">
                                        {{message}}
                                    </div>
                                    <div class="flex flex-auto flex-row-reverse">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                 fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round"
                                                 stroke-linejoin="round"
                                                 class="feather feather-x cursor-pointer hover:text-red-400 rounded-full w-5 h-5 ml-2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="showInfo" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title"
                     role="dialog"
                     aria-modal="true">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                             aria-hidden="true"></div>

                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>


                        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div class="bg-green-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                                <div
                                        class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-700 bg-green-100 ">
                                    <div slot="avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round"
                                             stroke-linejoin="round" class="feather feather-check-circle w-5 h-5 mx-2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                    </div>
                                    <div class="text-xl font-normal  max-w-full flex-initial">{{message}}</div>
                                    <div class="flex flex-auto flex-row-reverse">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                 fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round"
                                                 stroke-linejoin="round"
                                                 class="feather feather-x cursor-pointer hover:text-green-400 rounded-full w-5 h-5 ml-2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div v-if="show" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
             aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">

                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Agregar nuevo contacto
                                </h3>

                            </div>

                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <label class="block text-gray-700 text-sm font-bold mb-2"
                                   for="file">Cargar imagen</label>
                            <div class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                                <div class="absolute">
                                    <div class="flex flex-col items-center ">
                                        <img v-if="image" v-bind:src="image" width="70" height="70"
                                             class="rounded-md" alt="">
                                        <i class="fa fa-cloud-upload fa-3x text-gray-200"></i> <span
                                            class="block text-gray-400 font-normal">Attach you files here</span> <span
                                            class="block text-gray-400 font-normal">or</span> <span
                                            class="block text-blue-400 font-normal">Browse files</span></div>
                                </div>
                                <input type="file" id="file" ref="file" v-on:change="handleImage"
                                       class="h-full w-full opacity-0" name="" accept="image/*">

                            </div>
                        </div>

                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <label class="block text-gray-700 text-sm font-bold mb-2"
                                   for="fullName">Nombre</label>
                            <input type="text" v-model="input.full_name"
                                   class="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                                   id="fullName">
                        </div>

                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <label class="block text-gray-700 text-sm font-bold mb-2"
                                   for="fullName">Apellido</label>
                            <input type="text" v-model="input.lastName"
                                   class="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                                   id="lastName">
                        </div>

                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <label class="block text-gray-700 text-sm font-bold mb-2"
                                   for="description">Descripción</label>
                            <textarea v-model="input.description"
                                      class="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                                      id="description"></textarea>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" v-on:click="saveUser(null)"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Guardar
                        </button>
                        <button type="button" v-on:click="hideModal"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from "axios";

    const url = `${process.env.VUE_APP_API_URL}`;
    export default {
        name: "UserComponent",
        data() {
            return {
                show: false,
                showAlert: false,
                showInfo: false,
                loading: false,
                title: 'AmobaSoftware',
                page: 1,
                links: [],
                users: [],
                search: '',
                input: {
                    full_name: '',
                    lastName: '',
                    description: ''
                },
                file: '',
                image: '',
                isEdit: false,
                ID: '',
                message: ''
            }
        },
        methods: {
            showModal() {
                this.show = true;
            },
            hideModal() {
                this.show = false;
            },
            getPage() {
                const search = this.search.length != 0 ? '&search=' + this.search : '';
                const uri = url + `/users?page=${this.page}${search}`;
                this.loading = true;
                axios.get(uri).then((result) => {
                    console.log(result.data);
                    this.users = result?.data?.data;
                    this.links = result?.data?.links;
                    this.loading = false;
                    this.show = false;
                    this.showAlert = false;
                    this.showInfo = false;
                });
            },
            getPageByUrl(args) {
                const search = this.search.length != 0 ? '&search=' + this.search : '';
                const uri = args + `${search}`;
                this.loading = true;
                axios.get(uri).then((result) => {
                    console.log(result.data);
                    this.users = result?.data?.data;
                    this.links = result?.data?.links;
                    this.loading = false;
                    this.show = false;
                    this.showAlert = false;
                    this.showInfo = false;
                });
            },
            setSearch() {
                this.getPage();
            },
            linkPages(args) {
                console.log(args);
                if (args !== null || args?.length > 0) {
                    this.getPageByUrl(args);
                }
            },
            saveUser(id = null) {
                let lastName;
                let firstName;
                if (id !== null) {
                    // const tg0 = "info_fullname_" + id;
                    const tg = "fullname_" + this.ID;

                    // const tgx0 = "info_description_" + this.ID;
                    const tgx = "description_" + this.ID;
                    this.input.full_name = document.querySelector('#' + tg).value;
                    this.input.description = document.querySelector('#' + tgx).value;
                    this.file = null;
                }

                // if (this.input.full_name.includes(" ")) {
                //     firstName = this.input.full_name.split(' ')[0];
                //     lastName = this.input.full_name.split(' ')[1];
                // } else {
                //     firstName = this.input.full_name;
                //     lastName = this.input.lastName;
                // }

                firstName = this.input.full_name;
                lastName = this.input.lastName;


                let formData = new FormData();
                formData.append('first_name', firstName);
                formData.append('last_name', lastName);
                formData.append('description', this.input.description);
                if (this.file != null) {
                    formData.append('imag_profile', this.file);
                }
                const args = (id == null) ? '' : '/' + id;
                const uri = url + '/users' + args;
                axios.post(uri, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then((result) => {
                    console.log(result);
                    if (result.status === 200) {
                        this.show = false;
                        this.showAlert = false;
                        this.showInfo = true;
                        this.message = (id == null) ? 'Registro almacenado' : 'Registro Actualizado';
                        setTimeout(() => {
                            this.getPage();
                            this.input.full_name = '';
                            this.input.lastName = '';
                            this.input.description = '';
                        }, 1000)


                    } else {
                        this.show = false;
                        this.showAlert = true;
                        this.showInfo = false;
                        this.message = "Error al procesar la información";
                    }
                });

            },
            edit(id) {
                console.log(id);
                // this.isEdit = true;

                const tg0 = "info_fullname_" + id;
                const tg = "fullname_" + id;

                const tgx0 = "info_description_" + id;
                const tgx = "description_" + id;

                const tgs = "save_" + id;
                const tge = "edit_" + id;

                this.ID = id;
                document.querySelector('#' + tge).style.display = "none";
                document.querySelector('#' + tgs).style.display = "block";

                document.querySelector('#' + tg0).style.display = "none";
                document.querySelector('#' + tg).style.display = "block";
                document.querySelector('#' + tgx0).style.display = "none";
                document.querySelector('#' + tgx).style.display = "block";
                console.log(document.querySelector('#' + tg));
                const uri = url + `/users/${id}`;
                this.isEdit=false;

                axios.get(uri).then((result) => {
                    // this.loading=false;
                    this.isEdit=true;
                    let data = result?.data;
                    // document.querySelector('#' + tg).value = data.first_name + ' ' + data.last_name;
                    document.querySelector('#' + tg).value = data.first_name;
                    document.querySelector('#' + tgx).value = data.description;
                    this.input.lastName = data.last_name;
                    // this.input.description = document.querySelector('#' + tgx).value;
                });

                // this.input.full_name = document.querySelector('#' + tg).value;
                // this.input.description = document.querySelector('#' + tgx).value;
            },
            handleImage(e) {
                const selectFile = e.target.files[0];
                this.file = selectFile;
                // const selectFile = this.$refs.file.files[0];
                this.fileToImage(selectFile);
            },
            fileToImage(fileObject) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                    console.log(this.image);
                };
                reader.readAsDataURL(fileObject);
            },
            deleteUser(id) {
                const uri = url + `/users/${id}`;
                axios.delete(uri).then((resutl) => {
                    if (resutl.status === 204) {
                        this.message = 'Registro Eliminado';
                        this.showAlert = true;
                        setTimeout(() => {

                            this.getPage();
                        }, 1000);

                    }
                });
            }
        },
        mounted() {
            console.log(`api: ${process.env.VUE_APP_API_URL}`);
            this.getPage();
        }
    }
</script>
<style>
    .loader {
        border-top-color: #3498db;
        -webkit-animation: spinner 1.5s linear infinite;
        animation: spinner 1.5s linear infinite;
    }

    @-webkit-keyframes spinner {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .paginate-links {
        width: 100%;
        list-style: none;
        text-align: center;
    }

    .paginate-links li {
        display: inline;
        background-color: #E43A48;
        color: white;
        padding: 0.5rem;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        cursor: pointer;
        border-radius: 3px;
    }

    .paginate-result {
        width: 100%;
        text-align: center;
        margin-bottom: 1rem;
    }
</style>
<!--<style lang="sass">-->
<!--    ul-->
<!--        list-style-type: none-->
<!--        padding: 0-->

<!--        li-->
<!--            display: inline-block-->
<!--            margin: 0 10px-->

<!--        .paginate-list-->
<!--            width: 159px-->
<!--            margin: 0 auto-->
<!--            text-align: left-->

<!--            li-->
<!--                display: block-->

<!--                &:before-->
<!--                    content: '⚬ '-->
<!--                    font-weight: bold-->
<!--                    color: slategray-->

<!--        .paginate-links.items-->
<!--            user-select: none-->

<!--            a-->
<!--                cursor: pointer-->

<!--            li.active a-->
<!--                font-weight: bold-->

<!--            li.next:before-->
<!--                content: ' | '-->
<!--                margin-right: 13px-->
<!--                color: #ddd-->

<!--            li.disabled a-->
<!--                color: #ccc-->
<!--                cursor: no-drop-->

<!--        a-->
<!--            color: #42b983-->
<!--</style>-->