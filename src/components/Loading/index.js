import React, { useRef, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";





export default function LoadingPage () {

    return(
        <div className="loading-screen">
            <Loader type="Rings" color="#00BFFF" height={120} width={120} />
        </div>
    )
}