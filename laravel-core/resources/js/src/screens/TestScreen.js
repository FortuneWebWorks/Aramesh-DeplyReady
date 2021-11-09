import React from 'react';
import Tests from '../components/Tests';
import testQuestionsSession from '../sessions/testQuestionsSession';
import { Head } from '@inertiajs/inertia-react';

const TestScreen = ({testTaker}) => {

  return (
    <>
      <Head>
        <title>وبسایت آرامش | تست</title>
        <meta name="description" content="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان"/>
        <meta name="keywords" content="آرامش, aramesh, aramesh.org, aramesh.ir, aramesh_login, تست, تست آرامش"/>
        <meta name="robots" content="noindex"/>
      </Head>
      <div className="test-screen">
        <div className="container">
          <div className="title bg-shape">
            <div className="title-content">
              <svg
                className="logo"
                xmlns="http://www.w3.org/2000/svg"
                width="71.902"
                height="73.51"
                viewBox="0 0 71.902 73.51"
              >
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M69.093,0H61.229a7.11,7.11,0,0,0-7.022,7.179V28.227A12.8,12.8,0,0,1,41.568,41.148V10.079a1.422,1.422,0,0,1,1.4-1.436h1.4a2.844,2.844,0,0,0,2.809-2.871v-2.9A2.844,2.844,0,0,0,44.377,0H27.525a2.844,2.844,0,0,0-2.809,2.871v2.9a2.844,2.844,0,0,0,2.809,2.871h1.4a1.422,1.422,0,0,1,1.4,1.436v9.792a1.4,1.4,0,1,0,2.809,0V10.079a4.266,4.266,0,0,0-4.213-4.307h-1.4v-2.9H44.377v2.9h-1.4a4.266,4.266,0,0,0-4.213,4.307V42.584a1.42,1.42,0,0,0,1.4,1.436h1.4A15.641,15.641,0,0,0,57.016,28.227V7.179a4.266,4.266,0,0,1,4.213-4.307h7.864v2.9H67.268a4.692,4.692,0,0,0-4.634,4.738V28.227A21.329,21.329,0,0,1,41.568,49.763h-1.4a1.42,1.42,0,0,0-1.4,1.436V63.431a4.266,4.266,0,0,0,4.213,4.307h1.4v2.9H27.525v-2.9h1.4a4.266,4.266,0,0,0,4.213-4.307V51.2a1.42,1.42,0,0,0-1.4-1.436h-1.4A21.329,21.329,0,0,1,9.269,28.227V10.51A4.692,4.692,0,0,0,4.634,5.772H2.809v-2.9h7.864a4.266,4.266,0,0,1,4.213,4.307V28.227A15.641,15.641,0,0,0,30.334,44.02h1.4a1.42,1.42,0,0,0,1.4-1.436V32.792a1.4,1.4,0,1,0-2.809,0v8.356A12.8,12.8,0,0,1,17.695,28.227V7.179A7.11,7.11,0,0,0,10.673,0H2.809A2.844,2.844,0,0,0,0,2.871v2.9A2.844,2.844,0,0,0,2.809,8.643H4.634A1.849,1.849,0,0,1,6.46,10.51V28.227a24.511,24.511,0,0,0,7.012,17.239,23.446,23.446,0,0,0,16.862,7.169v10.8a1.422,1.422,0,0,1-1.4,1.436h-1.4a2.844,2.844,0,0,0-2.809,2.871v2.9a2.844,2.844,0,0,0,2.809,2.871H44.377a2.844,2.844,0,0,0,2.809-2.871v-2.9a2.844,2.844,0,0,0-2.809-2.871h-1.4a1.422,1.422,0,0,1-1.4-1.436v-10.8h0A23.446,23.446,0,0,0,58.43,45.466a24.511,24.511,0,0,0,7.012-17.239V10.51a1.849,1.849,0,0,1,1.826-1.866h1.826A2.844,2.844,0,0,0,71.9,5.772v-2.9A2.844,2.844,0,0,0,69.093,0Z"
                  transform="translate(0 0)"
                  fill="#fbfbfb"
                />
              </svg>
              <img src="" alt="" />
              <h3 className="screen-title-title">تست روانشناسی خانواده</h3>
              <p className="screen-title-desc">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
                ستون و سطرآنچنان که حال و{' '}
              </p>
            </div>
          </div>
          <Tests data={testQuestionsSession().getQuestions()} title="Posts" dataLimit={10} testTaker={testTaker}/>
        </div>
      </div>
    </>
  );
};

export default TestScreen;
