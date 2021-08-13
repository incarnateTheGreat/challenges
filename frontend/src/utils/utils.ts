import toast from "react-hot-toast";

export const handleNavClick = (path, history) => () => {
  history.push(path);
};

// Parse the Link Headers that come from the server call.
export const parseLinkHeader = (linkHeader) => {
  const linkHeadersArray = linkHeader
    .split(", ")
    .map((header) => header.split("; "));

  const linkHeadersMap = linkHeadersArray.map((header) => {
    const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "");
    let thisHeaderUrl = header[0]
      .slice(1, -1)
      .replace("<", "")
      .replace(">", "");

    const findIndexOf = thisHeaderUrl.indexOf("?");
    const params = thisHeaderUrl
      .slice(findIndexOf + 1, thisHeaderUrl.length)
      .split("&");
    const pageParams = params[0].split("=");

    return [thisHeaderRel, +pageParams[1]];
  });

  return Object.fromEntries(linkHeadersMap);
};

export const assignActivePageClass = (current, page) =>
  current === page ? "active" : "";

// Toasts
export const notifyError = () => {
  return toast.error("There was an error with your request.");
};

export const notifyPostSuccess = () => {
  return toast.success("Your Consent has been added.");
};
