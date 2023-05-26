export const pattern = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    descriptionEn:
        /^[A-Za-z]?[A-Za-z $&+,’:;=?@#|'<>.^*()%!\-(\r\n[\]|\r|\n)0-9 ]{5,}$/,
    textEnWithSpace: /^[A-Za-z][a-zA-Z0-9?().><;,{}[\]\-_’+=!@#$%\^&*|' ]*$/,
};