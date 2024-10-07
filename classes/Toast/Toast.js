export default class Toast {
  constructor(duration = 1000) {
    this.duration = duration;

    this.toastContainer = document.createElement("div");
    this.toastContainer.className = "toast-container";

    document.body.appendChild(this.toastContainer);
  }

  success(message) {
    const toastElement = document.createElement("div");
    toastElement.onclick = () => this.close(toastElement);
    toastElement.className = "toast success";
    toastElement.innerHTML = `
      <span class="toast-icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m382-354 339-339q12-12 28.5-12t28.5 12q12 12 12 28.5T778-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>
      </span>
      <span>${message}</span>
    `;

    this.show(toastElement);
  }

  error(message) {
    const toastElement = document.createElement("div");
    toastElement.onclick = () => this.close(toastElement);
    toastElement.className = "toast error";
    toastElement.innerHTML = `
      <span class="toast-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#E10E0E"/>
        <g clip-path="url(#clip0_1233_2269)">
        <path d="M10.0004 4.33789C6.86914 4.33789 4.33789 6.86914 4.33789 10.0004C4.33789 13.1316 6.86914 15.6816 10.0004 15.6816C13.1316 15.6816 15.6816 13.1316 15.6816 10.0004C15.6816 6.86914 13.1316 4.33789 10.0004 4.33789ZM10.0004 14.8379C7.33789 14.8379 5.18164 12.6629 5.18164 10.0004C5.18164 7.33789 7.33789 5.18164 10.0004 5.18164C12.6629 5.18164 14.8379 7.35664 14.8379 10.0191C14.8379 12.6629 12.6629 14.8379 10.0004 14.8379Z" fill="white"/>
        <path d="M11.7252 8.25645C11.5564 8.0877 11.2939 8.0877 11.1252 8.25645L10.0002 9.4002L8.85645 8.25645C8.6877 8.0877 8.4252 8.0877 8.25645 8.25645C8.0877 8.4252 8.0877 8.6877 8.25645 8.85645L9.4002 10.0002L8.25645 11.1439C8.0877 11.3127 8.0877 11.5752 8.25645 11.7439C8.33145 11.8189 8.44395 11.8752 8.55645 11.8752C8.66895 11.8752 8.78145 11.8377 8.85645 11.7439L10.0002 10.6002L11.1439 11.7439C11.2189 11.8189 11.3314 11.8752 11.4439 11.8752C11.5564 11.8752 11.6689 11.8377 11.7439 11.7439C11.9127 11.5752 11.9127 11.3127 11.7439 11.1439L10.6002 10.0002L11.7439 8.85645C11.8939 8.6877 11.8939 8.4252 11.7252 8.25645Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1233_2269">
        <rect width="12" height="12" fill="white" transform="translate(4 4)"/>
        </clipPath>
        </defs>
        </svg>

      </span>
      <span>${message}<span>
    `;
    this.show(toastElement);
  }

  warning(message) {
    const toastElement = document.createElement("div");
    toastElement.onclick = () => this.close(toastElement);
    toastElement.className = "toast warning";
    toastElement.innerHTML = `
      <span class="toast-icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M109-120q-11 0-20-5.5T75-140q-5-9-5.5-19.5T75-180l370-640q6-10 15.5-15t19.5-5q10 0 19.5 5t15.5 15l370 640q6 10 5.5 20.5T885-140q-5 9-14 14.5t-20 5.5H109Zm69-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm0-120q17 0 28.5-11.5T520-400v-120q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v120q0 17 11.5 28.5T480-360Zm0-100Z"/></svg>
      </span>
      <span>${message}<span>
    `;
    this.show(toastElement);
  }

  show(toastElement) {
    this.toastContainer.appendChild(toastElement);

    setTimeout(() => {
      toastElement.classList.add("active");
    }, 100);

    setTimeout(() => this.close(toastElement), this.duration);
  }

  close(toastElement) {
    toastElement.classList.remove("active");

    setTimeout(() => {
      this.toastContainer.removeChild(toastElement);
    }, 500);
  }
}
