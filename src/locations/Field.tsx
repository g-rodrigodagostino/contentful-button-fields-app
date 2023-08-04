import { useEffect, useState } from 'react';
import { kebabCase } from 'lodash';
import {
  Caption,
  FormControl,
  Grid,
  Radio,
  Stack,
  Switch,
  TextInput,
} from '@contentful/f36-components';
import { FieldAppSDK } from '@contentful/app-sdk';
import { useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';
import '../styles/color-schemes.css';

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  useAutoResizer();

  const fields = sdk.field.getValue();

  const [variant, setVariant] = useState<
    'primary-fill' | 'primary-outline' | 'secondary-fill' | 'secondary-outline'
  >(fields.variant || undefined);
  const [text, setText] = useState(fields.text || '');
  const [url, setUrl] = useState(fields.url || '');
  const [icon, setIcon] = useState<'arrow' | 'play' | undefined>(fields.icon || undefined);
  const [hasAnalytics, setHasAnalytics] = useState<boolean>(fields.hasAnalytics || false);
  const [analyticsContext, setAnalyticsContext] = useState(fields.analyticsContext || '');
  const [analyticsEventName, setAnalyticsEventName] = useState(fields.analyticsEventName || '');

  useEffect(() => {
    sdk.field.setValue({
      variant,
      text,
      url,
      icon,
      hasAnalytics,
      analyticsContext,
      analyticsEventName,
    });
  }, [variant, text, url, icon, hasAnalytics, analyticsContext, analyticsEventName]);

  const variantList = [
    {
      id: 'primary-fill',
      label: 'Primary Fill',
    },
    {
      id: 'primary-outline',
      label: 'Primary Outline',
    },
    {
      id: 'secondary-fill',
      label: 'Secondary Fill',
    },
    {
      id: 'secondary-outline',
      label: 'Secondary Outline',
    },
  ];

  return (
    <>
      <FormControl isRequired isInvalid={!text}>
        <FormControl.Label>Variant</FormControl.Label>
        <Grid className="variants" columns="repeat(4, 1fr)">
          {variantList.map((v) => (
            <Stack
              flexDirection="column"
              marginTop="spacingM"
              marginBottom="spacingM"
              spacing="spacingXs"
              alignItems="center"
            >
              <button
                className={`variant__button variant__button--${kebabCase(v.label)}`}
                aria-pressed={variant === v.id}
                aria-label={`Color ${v.label}`}
                style={{
                  outline: v.id === variant ? '3px solid #bd002a' : 'none',
                  outlineOffset: v.id === variant ? '2px' : 'none',
                }}
                onClick={() =>
                  setVariant(
                    v.id as
                      | 'primary-fill'
                      | 'primary-outline'
                      | 'secondary-fill'
                      | 'secondary-outline'
                  )
                }
              >
                {text || 'Click me'}
                {icon === 'arrow' && (
                  <svg
                    className="icon icon--arrow-cta"
                    width={16}
                    height={14}
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.4 1 15 6.6l-5.6 5.6M15 6.6H1"
                    />
                  </svg>
                )}
                {icon === 'play' && (
                  <svg
                    className="icon"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7l3 2-3 2Z"
                    />
                  </svg>
                )}
              </button>
              <Caption fontWeight="fontWeightMedium">{v.label}</Caption>
            </Stack>
          ))}
        </Grid>
      </FormControl>
      <FormControl isRequired isInvalid={!text}>
        <FormControl.Label>Text</FormControl.Label>
        <TextInput name="text" value={text} onChange={(e) => setText(e.target.value)} />
        <FormControl.HelpText>Provide a text for the button.</FormControl.HelpText>
        {!text && (
          <FormControl.ValidationMessage>
            Please, provide a text for the button.
          </FormControl.ValidationMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={!text}>
        <FormControl.Label>URL</FormControl.Label>
        <TextInput name="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <FormControl.HelpText>Provide a URL for the button.</FormControl.HelpText>
        {!text && (
          <FormControl.ValidationMessage>
            Please, provide a text for the button.
          </FormControl.ValidationMessage>
        )}
      </FormControl>
      <FormControl>
        <FormControl.Label>Icon</FormControl.Label>
        <Stack flexDirection="row">
          <Radio
            id="none"
            name="icon"
            value="none"
            isChecked={icon === undefined}
            onChange={() => setIcon(undefined)}
          >
            None
          </Radio>
          <Radio
            id="arrow"
            name="icon"
            value="arrow"
            isChecked={icon === 'arrow'}
            onChange={() => setIcon('arrow')}
          >
            Arrow
          </Radio>
          <Radio
            id="play"
            name="icon"
            value="play"
            isChecked={icon === 'play'}
            onChange={() => setIcon('play')}
          >
            Play
          </Radio>
        </Stack>
      </FormControl>
      <FormControl>
        <Switch
          name="allow-cookies-controlled"
          id="allow-cookies-controlled"
          isChecked={hasAnalytics}
          onChange={() => setHasAnalytics((prevState) => !prevState)}
        >
          Add Analytics
        </Switch>
      </FormControl>
      {hasAnalytics && (
        <>
          <FormControl>
            <FormControl.Label>Analytics Context</FormControl.Label>
            <TextInput
              name="text"
              value={analyticsContext}
              onChange={(e) => setAnalyticsContext(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Analytics Event Name</FormControl.Label>
            <TextInput
              name="text"
              value={analyticsEventName}
              onChange={(e) => setAnalyticsEventName(e.target.value)}
            />
          </FormControl>
        </>
      )}

      <style jsx>{`
        .variant__button {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          border: none;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: all 200ms;
          cursor: pointer;

          &:not([class*='link-only']) {
            height: 3rem;
            padding: 0 1.5rem;
            border-radius: 2rem;
          }

          &[class*='link-only'] {
            white-space: initial;

            :global(span) {
              border-bottom: ${!!icon ? 'none' : '1px solid currentColor'};
            }
          }

          &:hover {
            text-decoration: none;

            :global(.icon--arrow-cta),
            :global(.icon--arrow-link) {
              animation: arrow 0.4s ease-in-out forwards;
            }
          }

          &:focus {
            outline: 0;
          }

          :global(span) {
            color: inherit;
          }

          :global(.icon) {
            vertical-align: middle;
          }

          &--small:not([class*='link-only']) {
            height: 2.5rem;
          }

          &--wide {
            width: 100%;
          }

          &--primary-fill,
          &--secondary-fill,
          &--primary-outline,
          &--secondary-outline {
            &:active {
              transform: translateY(4px);
            }
          }

          &--primary-fill {
            background-color: var(--blue);
            color: var(--paper);

            &:focus,
            &:hover {
              background-color: #004ad9;
            }
          }

          &--primary-outline {
            background-color: transparent;
            box-shadow: inset 0 0 0 2px var(--blue);
            color: var(--blue);

            &:focus,
            &:hover {
              color: #004ad9;
              box-shadow: inset 0 0 0 3px #004ad9;
            }
          }

          &--secondary-fill {
            background-color: var(--slate);
            color: var(--paper);

            &:focus,
            &:hover {
              background-color: var(--neutral-800);
              color: var(--paper);
            }
          }

          &--secondary-outline {
            background-color: transparent;
            box-shadow: inset 0 0 0 2px var(--slate);
            color: var(--slate);

            &:focus,
            &:hover {
              box-shadow: inset 0 0 0 3px var(--neutral-800);
              color: var(--slate);
            }
          }

          :global(.icon--arrow-cta),
          :global(.icon--arrow-link) {
            transform: translate3d(0, 0, 0);
            animation: arrow-reverse 0.4s ease-in-out;
          }

          @keyframes arrow {
            0% {
              transform: translate3d(0, 0, 0);
            }
            40% {
              transform: translate3d(5px, 0, 0);
            }
            60% {
              transform: translate3d(3px, 0, 0);
            }
            100% {
              transform: translate3d(4px, 0, 0);
            }
          }

          @keyframes arrow-reverse {
            0% {
              transform: translate3d(4px, 0, 0);
            }
            40% {
              transform: translate3d(-1px, 0, 0);
            }
            60% {
              transform: translate3d(1px, 0, 0);
            }
            100% {
              transform: translate3d(0, 0, 0);
            }
          }
        }
      `}</style>
    </>
  );
};

export default Field;
